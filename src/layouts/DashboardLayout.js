import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DashboardNav } from '../components';
import FaceIcon from '@material-ui/icons/Face';
import { Widget, addResponseMessage, renderCustomComponent} from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function DashboardLayout(props) {
  const classes = useStyles();

  useEffect(() => {
    addResponseMessage("Welcome to the chat!");
  }, []);
  
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    //addResponseMessage(response);
  }

  return (
    <div style={{ display: 'flex' }}>
      <DashboardNav listItems={props.listItems} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={'https://www.midtownatlanta.org/wp-content/uploads/2019/06/istockphoto-1005214200-170667a.jpg'}
          senderPlaceHolder="Type your message"
          title="Discussion"
          subtitle="Ask any questions you want!"
        />
        <Container maxWidth='lg' className={classes.container}>
          {props.routes}
        </Container>
      </main>
    </div>
  );
}
