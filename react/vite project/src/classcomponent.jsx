import react, {component} from "react";

class ClassExample extends component{
constructor(){
    super()
    this.state={
        count:0
    }
}

addCounter=()=>{
    this.state({
        count:this.state.count+1
    })
}

render() {
    <div>
        <h3>Class Compnent Example</h3>
        <h4> count is -- {this.state}</h4>

        </div>
}
}