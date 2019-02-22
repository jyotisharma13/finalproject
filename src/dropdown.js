import React from 'react';
export default class Dropdown extends React.Component {
    constructor(){
        super();
        this.state={
            displayMenu:false,
        };
        this.showDropdownMenu=this.showDropdownMenu.bind(this);
        this.hideDropdownMenu=this.hideDropdownMenu.bind(this);
    }

    showDropdownMenu(e){
        e.preventDefault();
        this.setState({displayMenu:true}, ()=>{
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }
    hideDropdownMenu(e){
        e.preventDefault();
        this.setState({displayMenu:false}, ()=>{
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }
    render(){
        return(
            <div>
                <div className="button12" onClick={this.showDropdownMenu}>DISCOVER</div>
                { this.state.displayMenu ? (
                    <ul className="dropdown">
                        <li><a className="active" href="#create page">Popular Categories </a></li>
                        <li><a className="active" href="#create page">Cardio Heavy </a></li>
                        <li><a className="active" href="#create page">Advanced Practice</a></li>
                        <li><a className="active" href="#create page">Steady Pace</a></li>
                        <li><a className="active" href="#create page">Beginners </a></li>
                        <li><a className="active" href="#create page">Build Strength </a></li>
                        <li><a className="active" href="#create page">Increase Flexibility </a></li>
                        <li><a className="active" href="#create page">Burn Fat  </a></li>
                        <li><a className="active" href="#create page">Get Calm </a></li>
                        <li><a className="active" href="#create page">Detox & Twist</a></li>
                        <li><a className="active" href="#create page">Core Workouts </a></li>
                        <li><a className="active" href="#create page">Detox & Twist</a></li>

                    </ul>
                ):
                    (null)
                }
            </div>
        );
    }
}
// export default Dropdown;
