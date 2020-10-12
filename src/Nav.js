import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return(
        <nav> 
            <h2> Restaurant App Name </h2>
            <Link to="/signin"> 
                <h3> Sign in</h3>
            </Link> 
        </nav>
    );
}
 
export default Nav;