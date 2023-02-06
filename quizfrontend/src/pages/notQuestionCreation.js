
import React,{ Component } from 'react';
class Form extends Component{
  constructor(props){
    super(props)
    this.state = { email:'',name:'', age:null, address:'',phoneNo:''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  // Form submitting logic, prevent default page refresh 
  handleSubmit(event){
    const { email, name, age, address, phoneNo } = this.state
    event.preventDefault()
    alert(`
      ____Your Details____\n
      Email : ${email}
      Name : ${name}
      Age : ${age}
      Address : ${address}
      Phone No : ${phoneNo}
    `)
  }
  
  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  handleChange(event){
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name] : event.target.value
    })
  }
  
  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
  render(){
    return(
      <>
      <form onSubmit={this.handleSubmit} className="formComponent">
      <h3>Create a question</h3>
        <label htmlFor='email'>Email</label>

        <input id="email"
          name='email'
          placeholder='Email'
          value={this.state.email}
          onChange={this.handleChange} />

        <label htmlFor='name'>Name</label>

        <input id="name"
          name='name'
          placeholder='Name'
          value={this.state.name}
          onChange={this.handleChange} />

        <label htmlFor='age'>Age</label>

        <input id="age"
          name='age'
          placeholder='Age'
          value={this.state.age}
          onChange={this.handleChange} />


        <label htmlFor='address'>Address</label>

        <input id="address"
          name='address'
          placeholder='Address'
          value={this.state.address}
          onChange={this.handleChange} />


        <label htmlFor='phoneNo'>Phone Number</label>

        <input id="phoneNo"
          name='phoneNo'
          placeholder='Phone No'
          value={this.state.phoneNo}
          onChange={this.handleChange} />

        <div className='creation-button-container'>
          <button>Create Account</button>
        </div>
      </form></>
    )
  }
}
  
export default Form

