
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
        type='select'
        className='data-editor'
        value={value}
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
      {["M", "G", "V", "H", "S"].map(v => {
        return (
          <div key={v} style={{float: 'left', width: '20%', height: '17px'}} />
        )
      })}
    </div>
  )
}

export default RangeEditor;