# Jitsi-Emoji-Reaction

### Table of contents

- [1. About](#1-about)
- [2. Project Stages](#2-project-stages)
  - [2.1 Create Emoji Button](#21-create-emoji-button)
  - [2.2 Add SVG for Button](#22-add-svg-for-button)
  - [2.3 Call from Toolbox.js](#23-call-from-toolbox.js)
  - [2.4 Create Dialog Component](#24-create-dialog-component)

#### 1. About

[This project](https://platform-euhack21.bemyapp.com/#/projects/608acbb203a87f0019ef3f6a) started developing on April 26th at [Winning over the classroom with Jitsi](https://euhack21.bemyapp.com/) Hackathon.

We have developed a project to offer a solution that allows users to avoid disruptions by allowing them to communicate non-verbal responses and responses.

#### 2. Project Stages

##### 2.1 Create Emoji Button

Firstly, create a [button](https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/react/features/toolbox/components/web/EmojiReactionButton.js) component that will appear in the toolbar. And export that from [index.js](https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/react/features/toolbox/components/web/index.js).

```
export { default as EmojiReactionButton } from './EmojiReactionButton';
```

##### 2.2 Add SVG for Button

Add a svg icon for emoji button in [svg folder](https://github.com/bayraktarulku/jitsi-projects/tree/main/emoji-reaction/jitsi-meet/react/features/base/icons/svg). We added [emoji-reaction.svg](https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/react/features/base/icons/svg/emoji-reaction.svg)
and export that from [index](https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/react/features/base/icons/svg/index.js#L50)

```
export { default as IconEmojiReaction } from './emoji-reaction.svg';
```
 
##### 2.3 Call from Toolbox.js
Firstly, import this three files in [Toolbox.js](https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/react/features/toolbox/components/web/Toolbox.js).

```
import IconEmojiReaction from '../../../base/icons';
import EmojiReactionButton from './EmojiReactionButton';
import EmojiReactionDialog from './EmojiReactionDialog';
```
Bind event handlers.
```
this._onToolbarEmojiReaction = this._onToolbarEmojiReaction.bind(this);
```
Create content of event handler.
```
_onToolbarEmojiReaction: () => void;

_onToolbarEmojiReaction() {
    this.props.dispatch(openDialog(EmojiReactionDialog));
}
```

Add the following condition to add emoji button to mainMenuAdditionalButtons and overflowMenuAdditionalButtons buttons
```
if (this._shouldShowButton('emoji-reaction')) {
    buttons.has('emoji-reaction')
        ? mainMenuAdditionalButtons.push(<ToolbarButton
            accessibilityLabel = { t('toolbar.accessibilityLabel.emojiReaction') }
            icon = { IconEmojiReaction }
            key = 'emojiReaction'
            onClick = { this._onToolbarEmojiReaction }
            tooltip = { t('toolbar.emojiReaction') } />)
        : overflowMenuAdditionalButtons.push(<OverflowMenuItem
            accessibilityLabel = { t('toolbar.accessibilityLabel.emojiReaction') }
            icon = { IconEmojiReaction }
            key = 'emojiReaction'
            onClick = { this._onToolbarEmojiReaction } />);
}
```

##### 2.4 Create Dialog Component
Create a [EmojiReactionDialog](https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/react/features/toolbox/components/web/EmojiReactionDialog.js) for the dialog that will open when we click the button. Here we have defined emoji urls. You can change these urls if you want. Emoji reaction time is 30 seconds. You can also change this time.





Toolbar Buttons Control
https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/react/features/toolbox/functions.web.js

Added config 

https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/react/features/base/config/constants.js

Added lang 
https://github.com/bayraktarulku/jitsi-projects/blob/main/emoji-reaction/jitsi-meet/lang/main.json
