import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function UL({items}) {
    return( 
        <List>
            {items.map((item) => (
                <ListItem>
                    <ListItemText primary={item}/>
                </ListItem>
            ))}
        </List>
    );
}