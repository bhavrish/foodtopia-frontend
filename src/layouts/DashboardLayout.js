import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DashboardNav } from '../components';
import FaceIcon from '@material-ui/icons/Face';
import { Widget, addResponseMessage, addUserMessage, renderCustomComponent} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import AuthContext from '../context/auth/authContext';
import CustomerContext from '../context/customer/customerContext';

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
  var Filter = require('bad-words'), filter = new Filter();

  const authContext = useContext(AuthContext);
  const { typeOfUser, user } = authContext;

  const customerContext = useContext(CustomerContext);
  const { discussionPosts, getDiscussionPosts, postToDiscussion, flagDiscussionPost } = customerContext;

  useEffect(() => {
    getDiscussionPosts();
    // eslint-disable-next-line
  }, []);
  
  // populate chat
  if (discussionPosts.length > 0) {
    let discussionPostsSet = [...new Set(discussionPosts)]; // turn into set to remove duplicates

    for (const discussionPost of discussionPostsSet) {
      if (user && discussionPost.messageFrom === user._id)
        addUserMessage(discussionPost.message);
      else
        addResponseMessage(discussionPost.message);
    }
  }

  // when user types new message
  const onNewMessage = (newMessage) => {
    newMessage = filter.clean(newMessage);
    const newMessageAsArr = newMessage.split(" "); // turn into array of words
    var numOfBadWords = 0;
    for(const word of newMessageAsArr) {
      if (word.charAt(0) === "*") // check how many words have * (aka bad words)
        numOfBadWords++;
    }
    console.log(numOfBadWords);

    if (user) {
      if (numOfBadWords >= 3) {
        flagDiscussionPost(user._id);
      }
      else {
        postToDiscussion({
          customerID: user._id,
          message: newMessage,
        });
      }
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <DashboardNav listItems={props.listItems} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {typeOfUser === 'customer' ? 
        <Widget
          handleNewUserMessage={onNewMessage}
          profileAvatar={'https://www.midtownatlanta.org/wp-content/uploads/2019/06/istockphoto-1005214200-170667a.jpg'}
          senderPlaceHolder="Type your message"
          title="Discussion"
          subtitle="Ask any questions you want!"
        />
        : null}
        <Container maxWidth='lg' className={classes.container}>
          {props.routes}
        </Container>
      </main>
    </div>
  );
}
