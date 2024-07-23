import React from 'react';
import "../App.css"
//custom footer component
const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer><p>Copyright &copy; {year}</p></footer>
    )
};
export default Footer;