import styled from "styled-components";

const Button = styled.button`
    border: none;
    border-radius: 25px;
    font-size: 15px;
    padding: 15px;

    &:hover {
        padding: 14px;
        background-color: black;
        color: white;
        border: 1px solid white;
    }
`;

export default Button;