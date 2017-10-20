import glamorous from 'glamorous';

const KeySignatures = {
  0: 'C',
  1: 'C♯, D♭',
  2: 'D',
  3: 'D♯, E♭',
  4: 'E',
  5: 'F',
  6: 'F♯, G♭',
  7: 'G',
  8: 'G♯, A♭',
  9: 'A',
  10: 'A♯, B♭',
  11: 'B'
}

const StatRow = glamorous.div({
  '@supports (display: grid)': {
    display: 'grid',
    gridTemplateColumns: '1.5fr 0.5fr 3fr',
    gridTemplateAreas: `
      "title value graph"
    `,
    gridGap: '10px',
  },
  fontSize: 17,
  marginBottom: 15
})
const TitleGraph = glamorous.div({
  '@supports (display: grid)': {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gridTemplateAreas: `
      "title graph"
    `,
    gridGap: '20px',
  },
  fontSize: 17,
  marginBottom: 15
})
const StatText = glamorous.div({
  '@supports (display: grid)': {
    display: 'grid',
    gridTemplateColumns: '1.5fr 3.5fr',
    gridTemplateAreas: `
      "title label"
    `,
    gridGap: '10px',
  },
  fontSize: 17,
  marginBottom: 15
})
const StatTitle = glamorous.div({
  color: '#bbb',
  gridArea: 'title',
  textAlign: 'left'
})
const StatTag = glamorous.div({
  color: '#bbb',
  gridArea: 'title',
  textAlign: 'center',
  border: 'solid 1px #ccc',
  borderRadius: 2,
  padding: 5
})
const StatValue = glamorous.div({
  color: '#777',
  gridArea: 'value',
  textAlign: 'right'
})
const StatLabel = glamorous.div({
  color: '#777',
  gridArea: 'label',
  textAlign: 'left'
})
const StatGraphHolder = glamorous.div({
  gridArea: 'graph',
  display: 'flex'
})
const StatGraph = glamorous.div({
  color: '#777',
  background: 'linear-gradient(to left, #27b7ff, #70D5FF)',
  transition: 'width 0.5s ease',
  height: 8,
  alignSelf: 'center',
  borderRadius: '3px'
})

export { KeySignatures, StatRow, StatTitle, StatTag, StatLabel, StatValue, StatGraphHolder, StatGraph, StatText, TitleGraph }