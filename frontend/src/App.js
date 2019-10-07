import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

const API_URL = 'http://localhost:8080';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            score: '',
            students: [

            ]
    }
    }
    handleChange = (event) => {
        const { id } = event.target;
        const { value } = event.target;
        this.setState({ [id]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        superagent.post(`${API_URL}/scores/`)
            .send({ name: this.state.name, score: this.state.score })
            .set('Accept', 'application/json')
            .then(results => {
                this.props.getStudents(results.body);
            });
        this.setState({name: ''});
        this.setState({score: ''});

    };

    handleDelete = (event) => {
        event.preventDefault();
        const _id = event.target.value;
        superagent.delete(`${API_URL}/scores/${_id}`)
            .then( (response) => {
            })
            .then ( superagent.get(`${API_URL}/scores`)
                .then ( (results) => {
                    this.props.getStudents(results.body);
                })
            )
    };


    componentDidMount() {
        superagent.get(`${API_URL}/scores`)
            .then ( (results) => {
                console.log(results);
                this.props.getStudents(results.body);
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.students.length !== prevProps.students.length){
            superagent.get(`${API_URL}/scores`)
                .then ( (results) => {
                    console.log(results);
                    this.props.getStudents(results.body);
                })
        }
    }

    render() {
        return (
            <>
                <h1> High Scores </h1>
                {
                    this.props.students.map( (student, idx) => {
                        if(idx === 0){
                           return <li key={student._id}><span> TOP SCORE </span>{student.name} - {student.score} points <button value={student._id} onClick={this.handleDelete}>Delete</button></li>
                        } else {
                          return  <li key={student._id}>{student.name} - {student.score} points <button value={student._id} onClick={this.handleDelete}>Delete</button></li>
                        }

                    }



                    )
                }
                <form onSubmit = {this.handleSubmit}>
                    <input
                        type='text'
                        id='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder='Enter a Name'
                    />
                    <input
                        type='text'
                        id='score'
                        value={this.state.score}
                        onChange={this.handleChange}
                        placeholder='Enter a Score'
                    />
                    <button type='submit'> Update </button>
                </form>
            </>
        );
    }


}


const mapStateToProps = (state) => {
    return {
        students: state.students,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStudents : (students) => {
            dispatch({
                type: 'STUDENTS_GET',
                payload: students,
            })
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);






















