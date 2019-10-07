export default (state = [], {type, payload}) => {
    switch(type) {
        case 'STUDENTS_GET':
            return payload;
        default:
            return state;
    }
};