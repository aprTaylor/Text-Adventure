import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText'

const logger = require('logdown')('UI:Actions.js')

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Actions = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  
  return (
    <Paper square className={classes.root}>
      <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        {props.actions && Object.keys(props.actions).map(action => (
          <Tab label={action} key={action}/>
        ))}
        }
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChange.bind(null, null)}
      >
        {props.actions && Object.keys(props.actions).map(action => (
          <TabContainer dir={theme.direction} key={action}>
            <List>
              {props.actions[action].map(item => (
                <ListItem button key={item.name} onClick={props.handleClick.bind(null, action, item.id)}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </TabContainer>
        ))}
      </SwipeableViews>
    </Paper>
  );
}

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}


Actions.propTypes = ({
  actions: PropTypes.array.isRequired
});

export default Actions