import React, { Component } from 'react';
import glamorous from 'glamorous';



class Avatar extends Component{
	render() {
    const AvatarContainer = glamorous.div({
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center'
    })
    const AvatarImg = glamorous.div({
      width: 40,
      height: 40,
      borderRadius: 20,
      background: `url(${this.props.me.images[0].url})`,
      backgroundSize: 'contain',
      marginRight: 10
    })
    const AvatarText = glamorous.div({
      alignSelf: 'center'
    })
		return (
      <AvatarContainer>
        <AvatarImg />
        <AvatarText>
          Hi! {this.props.me.display_name}
        </AvatarText>
      </AvatarContainer>
    )
  }
}

Avatar.defaultProps = {
  me: {
    display_name: "User",
    images: [
      {
        url: "https://cdn.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif"
      }
    ]
  }
}

export default Avatar;