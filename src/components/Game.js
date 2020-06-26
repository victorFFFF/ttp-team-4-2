import React, { Component } from "react";
import Pic1 from "../pic/pic1.png";
import Pic2 from "../pic/pic2.png";
import Pic3 from "../pic/pic3.png";
import Pic4 from "../pic/pic4.png";
import Pic5 from "../pic/pic5.png";
import Pic6 from "../pic/pic6.png";

import randomWords from './randomWords'
import './Game.css';



class Game extends Component {
constructor(props){
  super(props);
  this.state = {
    image: Pic1,
    wrong : 6,
    currentWrong: 1 ,
    answer: randomWords(),
    answerGotSoFar: [],
    answerLeftOver: [],
    copy: [],
    input: "",
    winner: "",
    restarted: false,
  }
  this.resetState = this.state

}

componentDidMount(){
    this.setState({answerLeftOver :[...this.state.answer]})
    this.setState({copy :[...this.state.answer]})
    let i ;


    for( i = 0; i < this.state.answer.length ; i++)
    {
      this.state.answerGotSoFar.push('_')
    }
    console.log(this.state.answerGotSoFar.length) 
}


reRender=()=>{
      switch(this.state.currentWrong)
      {
        case 1:
          this.setState({image : Pic1});
          break;
        case 2:
          this.setState({image : Pic2});
          break;
        case 3:
          this.setState({image : Pic3});
          break;
        case 4:
          this.setState({image : Pic4});
          break;
        case 5:
          this.setState({image : Pic5});
          break;
        case 6:
          this.setState({image : Pic6});
          break;

        default:
            break;   
      }
}


calculate=(e)=>{

            e.preventDefault();


                  //Wins
                  if(this.state.input == this.state.answer)
                       return this.setState({answerLeftOver : 0,
                                              answerGotSoFar: [...this.state.answer]})
                      else{
                           
                            //Check if input is a word or a letter
                            if(this.state.input.length ==  1)
                            {
                                  //Gets it wrong
                                if(!this.state.answerLeftOver.includes(this.state.input))
                                    this.setState({currentWrong: this.state.currentWrong + 1})
                                //Gets it right
                                else
                                {
                                  let i ;
                                     console.log("before need:" + this.state.answerLeftOver)
        
                                    for(i = 0; i < this.state.answerLeftOver.length; i++)
                                    {
                                      // Get it right and is finding it and removing array
                                      if(this.state.input == this.state.answerLeftOver[i])
                                        {

                                          //Get index position of the input
                                          let position;
                                          position = this.state.copy.indexOf(this.state.input)
                                            

                                          //modify copy array
                                          let coverOver = this.state.copy.slice();
                                          coverOver[position] = ''
                                          this.setState({copy: coverOver})
                                          console.log("copy array " + this.state.copy)

                                          

                                          //modify answerGotSoFar
                                          let copyOver = this.state.answerGotSoFar.slice()
                                          copyOver[position] = this.state.input
                                          console.log(copyOver + "COPY")
                                          this.setState({answerGotSoFar: copyOver})
                                          
                                          this.state.answerLeftOver.splice(i, 1)
                                          break;
                                        }
                                    }
                                      console.log(this.state.input + " is correct")
                              
                                    console.log("after need :" + this.state.answerLeftOver)
                                }
                                }
                            //Gets it wrong
                              else
                                  this.setState({currentWrong: this.state.currentWrong + 1})

                              //Executes everytime no matter what
                                this.reRender();
                                this.setState({turn : !this.state.turn, input: ''})
                               
                      }
                    
}


reset = (e) =>
{
  e.preventDefault();
  this.setState(this.resetState)
  this.setState({answerLeftOver :[...this.state.answer]})
  this.setState({copy :[...this.state.answer]})
}


updateInput = (e) =>{

        this.setState({input:  e.target.value})
}


  render() {
      console.log("Need :" + this.state.answerLeftOver)
    
      let status

    if(this.state.currentWrong > this.state.wrong +1)
       status = "GAME OVER!" 
       else if(this.state.answerLeftOver == 0)
       status = ("Winner!!! The answer is: " + this.state.answer)   
     else 
        status = (<img src={this.state.image} alt="Pic"/>)

        console.log(" Got :" + this.state.answerGotSoFar )

    let i;
    let display = "\n"

    for( i = 0; i < this.state.answerGotSoFar.length; i++)
    {
        display += " " + this.state.answerGotSoFar[i]
    }


    return (
      <div  className="main">
        <h4 style={{display: 'flex', justifyContent: 'center'}}>MELTMAN</h4>
        {status}
        <form>
        <label>
          <input type="text" maxLength={1} value={this.state.input} onChange={this.updateInput} />
        </label>
        <input class="btn btn-outline-dark"onClick={this.calculate} type="submit" value="Submit" />
          </form>
          <button type="button" class="btn btn-outline-danger" onClick={this.reset}>Reset</button>
          
      
        {/* {this.state.answerGotSoFar.map((x) =>(
          <div>
            <h1>{x}</h1>
            </div>
        ))} */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>{display}</h1>
      
          
      </div>
    );
  }
}

export default Game;