// @flow
import type { Node } from 'react';
import React from 'react';
import classnames from 'classnames';
import Button from 'component/button';
<<<<<<< HEAD

type ChannelInfo = {
  uri: string,
  name: string,
};
=======
import * as ICONS from 'constants/icons';
import CommentBadge from 'component/common/comment-badge';
>>>>>>> ed8986134 (add user badge)

type Props = {
  isResolvingUri: boolean,
  link: ?boolean,
  claim: ?Claim,
  hideAnonymous: boolean,
  // Lint thinks we aren't using these, even though we are.
  // Possibly because the resolve function is an arrow function that is passed in props?
  resolveUri: (string) => void,
  uri: string,
  channelInfo: ?ChannelInfo, // Direct channel info to use, bypassing the need to resolve 'uri'.
  // to allow for other elements to be nested within the UriIndicator
  children: ?Node,
  inline: boolean,
  external?: boolean,
  className?: string,
  focusable: boolean,
  selectOdyseeMembershipByClaimId: string,
};

class UriIndicator extends React.PureComponent<Props> {
  componentDidMount() {
    this.resolveClaim(this.props);
  }

  componentDidUpdate() {
    this.resolveClaim(this.props);
  }

  resolveClaim = (props: Props) => {
    const { isResolvingUri, resolveUri, claim, uri, channelInfo } = props;

    if (!channelInfo && !isResolvingUri && claim === undefined && uri) {
      resolveUri(uri);
    }
  };

  resolveState = (channelInfo: ?ChannelInfo, claim: ?Claim, isLinkType: ?boolean) => {
    if (channelInfo) {
      return {
        hasChannelData: true,
        isAnonymous: false,
        channelName: channelInfo.name,
        channelLink: isLinkType ? channelInfo.uri : false,
      };
    } else if (claim) {
      const signingChannel = claim.signing_channel && claim.signing_channel.amount;
      const isChannelClaim = claim.value_type === 'channel';
      const channelClaim = isChannelClaim ? claim : claim.signing_channel;

      return {
        hasChannelData: Boolean(channelClaim),
        isAnonymous: !signingChannel && !isChannelClaim,
        channelName: channelClaim?.name,
        channelLink: isLinkType ? channelClaim?.canonical_url || channelClaim?.permanent_url : false,
      };
    } else {
      return {
        hasChannelData: false,
        isAnonymous: undefined,
        channelName: undefined,
        channelLink: undefined,
      };
    }
  };

  render() {
    const {
      channelInfo,
      link,
      isResolvingUri,
      claim,
      children,
      inline,
      focusable = true,
      external = false,
      hideAnonymous = false,
      className,
<<<<<<< HEAD
=======
      selectOdyseeMembershipByClaimId,
<<<<<<< HEAD
>>>>>>> fa9b2ebcb (fixing lint errors)
=======
      comment,
>>>>>>> eed44eb23 (fix badge display on comments)
    } = this.props;

    if (!channelInfo && !claim) {
      return (
        <span className={classnames('empty', className)}>
          {isResolvingUri || claim === undefined ? __('Validating...') : __('[Removed]')}
        </span>
      );
    }

    const data = this.resolveState(channelInfo, claim, link);

    if (data.isAnonymous) {
      if (hideAnonymous) {
        return null;
      }

      return (
        <span dir="auto" className={classnames('channel-name', className, { 'channel-name--inline': inline })}>
          Anonymous
        </span>
      );
    }

    if (data.hasChannelData) {
      const { channelName, channelLink } = data;

      const inner = (
<<<<<<< HEAD
<<<<<<< HEAD
        <span dir="auto" className={classnames('channel-name', { 'channel-name--inline': inline })}>
<<<<<<< HEAD
          {channelName}
=======
          {name}
          {badgeToShow === 'silver' && <Icon size={25} icon={ICONS.PREMIUM} />}
          {badgeToShow === 'gold' && <Icon size={25} icon={ICONS.PREMIUM_PLUS} />}
>>>>>>> fa9b2ebcb (fixing lint errors)
        </span>
=======
        <>
          <span dir="auto" className={classnames('channel-name', { 'channel-name--inline': inline })}>
            {name}
          </span>
          {badgeToShow === 'silver' && <Icon size={25} icon={ICONS.PREMIUM} />}
          {badgeToShow === 'gold' && <Icon size={25} icon={ICONS.PREMIUM_PLUS} />}
        </>
>>>>>>> facf6d8c4 (Add badge to live chat)
=======
        <span dir="auto" className={classnames('channel-name', { 'channel-name--inline': inline })}>
          {name}
          {!comment && (<>
            {badgeToShow === 'silver' && <CommentBadge label={__('Premium')} icon={ICONS.PREMIUM} size={25} />}
            {badgeToShow === 'gold' && <CommentBadge label={__('Premium +')} icon={ICONS.PREMIUM_PLUS} size={25} />}
          </>)}
        </span>
>>>>>>> ed8986134 (add user badge)
      );

      if (!channelLink) {
        return inner;
      }

      if (children) {
        return (
          <Button
            aria-hidden={!focusable}
            tabIndex={focusable ? 0 : -1}
            className={className}
            target={external ? '_blank' : undefined}
            navigate={channelLink}
          >
            {children}
          </Button>
        );
      } else {
        return (
          <Button
            className={classnames(className, 'button--uri-indicator')}
            navigate={channelLink}
            target={external ? '_blank' : undefined}
            aria-hidden={!focusable}
            tabIndex={focusable ? 0 : -1}
          >
            {inner}
          </Button>
        );
      }
    } else {
      return null;
    }
  }
}

export default UriIndicator;
