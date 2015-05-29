function Event(start, end, i) {
    this.idx = i;
    this.start = start;
    this.end = end;
    this.column = 0;
    this.row = 0;
    this.begin = true;
    this.shortest = i;
    this.tallestHeight = end;
    this.height = end;
}
