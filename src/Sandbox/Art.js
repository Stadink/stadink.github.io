import React from 'react';

export class Art extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          file: null
        }
        this.handleChange = this.handleChange.bind(this)
      }

      handleChange(event) {
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
      }

    preview() {
        document.getElementById('blah').src=URL.createObjectURL(this.files[0]);
        // document.getElementById('blah').src='idk'
        console.log('wtf')
    }

    onChange = (e) => {
        console.log(e.target.files);
        console.log('onChanged!!!!!1111')
      };

  render() {
    return (
        <div id="Art">
            <h1><a href="https://willthisdofor.art" target="blank">willthisdofor.art</a></h1>

            <form id="new_document_attachment" method="post">
                <div class="actions"><input type="submit" name="commit" value="Submit" /></div>
                <input type="file" id="document_attachment_doc" onChange={this.handleChange} />
            </form>

            <img src={this.state.file} id="blah" alt="your image" width="100" height="100" onClick={this.handleChange}/>
        </div>
    );
  }

  componentDidMount() {
    const form = document.getElementById("new_document_attachment");
    const fileInput = document.getElementById("document_attachment_doc");
    
    fileInput.addEventListener('change', () => {
      form.submit();
      // document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])
    });
    
    window.addEventListener('paste', e => {
      fileInput.files = e.clipboardData.files;
      // document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])
    });
  }
}
