import React, { Component } from 'react';
import glamorous from 'glamorous';
import { signOut } from '../../javascripts/helpers';


class Avatar extends Component{
	render() {
    const AvatarContainer = glamorous.div({
      display: 'grid',
      gridTemplateAreas: `
        "text image"
      `,
      gridTemplateColumns: '1fr 40px'
    })
    let bgImage = this.props.me.images[0] ? this.props.me.images[0].url : "https://cdn.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif";
    const AvatarImg = glamorous.div({
      gridArea: 'image',
      width: 40,
      height: 40,
      borderRadius: 20,
      background: `url( ${bgImage} )`,
      backgroundSize: 'contain',
      marginRight: 10
    })
    const AvatarText = glamorous.div({
      textAlign: 'right',
      gridArea: 'text',
      padding: 5,
      lineHeight: 1
    })
    const AvatarSubText = glamorous.span({
      color: '#aaa',
      fontSize: 10,
      letterSpacing: 2,
      cursor: 'pointer'
    })
		return (
      <AvatarContainer>
        <AvatarImg />
        <AvatarText>
          {this.props.me.display_name ? this.props.me.display_name : this.props.me.id}
          <div>
            <AvatarSubText onClick={() => signOut()}>
              Sign out
            </AvatarSubText>
          </div>
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