from xml import sax
import json
import pickle

class Note():
    def __init__(self):
        self.note = ""
        self.instrument = ""

class Pattern():
    def __init__(self):
        self.lines = {}
        self.curline = -1
        self.numlines = 0
    def addNote(self, note):
        if self.curline > self.numlines: return
        if note.note == "---": return
        if self.curline not in self.lines:
            self.lines[self.curline] = [];
        self.lines[self.curline].append([note.note, note.instrument])

def parseInt(str):
    if str == "..":
        return None
    else:
        return int(str, 16)
    
    
class SimpleHandler(sax.ContentHandler):
    def __init__(self):
        self.state = ""
        self.bpm = 0
        self.lbp = 0
        self.seq = []
        self.patterns = []
        self.pattern = None
        self.note = None
        self.textData = ""
    
    def startElement(self, name, attrs):
        self.textData = ""
        if name == "SequenceEntries":
            self.state = "SEQUENCER"

        if name == "PatternPool":
            self.state = "PATTERNPOOL"

        if self.state == "PATTERNPOOL":
            if name == "Pattern":
                self.pattern = Pattern()
                
            if name == "Line":
                self.pattern.curline = int(attrs["index"])
                
            if name == "NoteColumn":
                self.note = Note()

    def endElement(self, name):
        if name == 'BeatsPerMin':
            self.bpm = int(self.textData);
        if name == 'LinesPerBeat':
            self.lpb = int(self.textData);
        if self.state == "SEQUENCER":
            if name == "Pattern":
                self.seq.append(int(self.textData.strip()));
        if self.state == "PATTERNPOOL":
            if name == "NumberOfLines":
                self.pattern.numlines = int(self.textData);
            if name == "Note":
                self.note.note = self.textData;
            if name == "Instrument":
                self.note.instrument = parseInt(self.textData);
            if name == "NoteColumn":
                self.pattern.addNote(self.note)
            if name == "Pattern":
                self.patterns.append(self.pattern)
        
    def characters(self, content):
        self.textData += content;

# Create a parser object
parser = sax.make_parser()

# Tell it what handler to use
handler = SimpleHandler()
parser.setContentHandler( handler )

# Parse a file!
parser.parse( 'Song.xml' )

patternnumber = 0

timeline = []
time = 0.0
timePerLine = 60.0 / (4 * handler.bpm)

print(handler.lbp)
print(handler.bpm)

for seqno in handler.seq:
    pattern = handler.patterns[seqno]
    timeline.append([time, [[seqno, -1]]]);
    for line in range(0, pattern.numlines):
        if line in pattern.lines:
            timeline.append([time, pattern.lines[line]]);
        time += timePerLine
            
tmin = int(time / 60);
tsec = time - tmin * 60;

f = open("song.js", "w")
f.write("songEvents = " + json.dumps(timeline))
f.close();
