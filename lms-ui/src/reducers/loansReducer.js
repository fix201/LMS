import * as actionTypes from '../actions/ActionTypes';

const initialState = {
    loans: [],
};

const loanReducer = (state = initialState, action) => {
    switch (action.type) { 
        case actionTypes.READ_LOAN_RECORDS:
            return {
                ...state,
                loans: action.payload
            };
        case actionTypes.UPDATE_LOAN_RECORD:
            return {
                ...state,
                loans: state.loans.map((loan) =>
                    loan.id === action.payload.id ? action.payload : loan
                )
            };
        case actionTypes.ADD_LOAN_RECORD:
            return {
                ...state,
                loans: [...state.loans, action.payload]
            };
        case actionTypes.DELETE_LOAN_RECORD:
            return {
                ...state,
                loans: state.loans.filter(loan => loan.id !== action.payload)
            };
        default:
            return state;
    }
};

export default loanReducer;