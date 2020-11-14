import React, { Component } from 'react'
import axios from "axios"

export class Ui extends Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef();
    this.state = {
      painting:false,
      ctx: {},
      color: 'black'
    }
  }
      finishedPosition=()=>{
        this.setState({
          painting : false,
        })
        this.state.ctx.beginPath();
      }

    startPosition = (e) => {
      this.setState({
        painting : true,
      })
        this.draw(e)
      }
  
      draw = (e) => {
      let offset =   this.canvas.current.getBoundingClientRect()
        // console.log(e.clientX - 520 , e.clientY -180,'e.clientX - 520 , e.clientY -180');
        const {ctx,painting,color} = this.state;
        if(!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round'
        ctx.lineTo(e.clientX - 520 , e.clientY -180);
        ctx.stroke();
        ctx.strokeStyle = `${color}`
        ctx.beginPath();
        ctx.moveTo(e.clientX -520, e.clientY -180 )
      }
  componentDidMount =()=>{
    
    this.setState({
      ctx: this.canvas.current.getContext("2d")
    })
  
    
  }

  downloadPdf = () => {
    var canvas = document.getElementById('canvas');
    var dataURL = canvas.toDataURL();
    
    axios.request({
      url: "http://localhost:5000/api/canvas",
      method : "POST",
      data : {
          image_url : dataURL
      },
      headers : {
        "Content-Type" : "application/json"
      }
    }).then(res => {
      console.log(res)
      if(res.data.success){
        var element = document.createElement('a'); 
        element.setAttribute('href', `http://localhost:5000/${res.data.data}`)

        element.setAttribute('download', "canvas.pdf"); 
        
        document.body.appendChild(element); 
              
        //onClick property 
        element.click(); 
      
        document.body.removeChild(element); 
      }
    }).catch(err => {
      console.log(err)
    })

  }

  render() {
    
    return (
      <div className='container text-center'>
        <h1 >Draw your Desire Simple Canvas </h1>
        <div className='d-flex justify-content-center my-5'>
        <div className='mx-3 circle' style={{background:'red'}} onClick={e=>this.setState({color:'red'})} ></div>
        <div className='mx-3 circle' style={{background:'green'}} onClick={e=>this.setState({color:'green'})}></div>
        <div className='mx-3 circle' style={{background:'yellow'}} onClick={e=>this.setState({color:'yellow'})}></div>
        <div className='mx-3 circle' style={{background:'blue'}} onClick={e=>this.setState({color:'blue'})}></div>
        </div>
      
        <canvas width="500" height="500" style={{ background:'#fff'}}  onMouseDown={this.startPosition}  onMouseUp={this.finishedPosition} onMouseMove={this.draw} ref={this.canvas} id="canvas"></canvas>

    
        <div>
        <button className='btn btn-primary' onClick={this.downloadPdf}>Download the PDF</button>

        </div>
      </div>
    )
  }
}

export default Ui
