
import React, { PureComponent } from 'react'
class RangeEditor extends PureComponent {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this._input.focus()
  }

  handleChange (e) {
    this.props.onChange(e.target.value)
  }

  render () {
    const {value, onKeyDown} = this.props
    return (
      <input
        ref={input => { this._input = input }}
        type='range'
        className='data-editor'
        value={value}
        min='1'
        max='5'
        onChange={this.handleChange}
        onKeyDown={onKeyDown}
      />
    )
  }
}

const FillViewer = props => {
  const { value } = props
  return (
    <div style={{width: '100%'}}>
      {[1, 2, 3, 4, 5].map(v => {
        const backgroundColor = v > value ? 'transparent' : '#007eff'
        return (
          <div key={v} style={{float: 'left', width: '20%', height: '17px', backgroundColor}} />
        )
      })}
    </div>
  )
}

export default RangeEditor;