// @flow

import React from 'react';
import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';


function EmojiReactionDialog() {

    const items = []
    const timeout = 30 * 1000;
    let timer = null;
    let defaultUrl = undefined;

    const emojiBaseUrl = 'https://jitsi-hacks.cketti.eu/';

    const emojis = [
      {
        cssName: 'thumbs-up',
        url: emojiBaseUrl + 'thumbs_up.png'
      },
      {
        cssName: 'thumbs-down',
        url: emojiBaseUrl + 'thumbs_down.png'
      },
      {
        cssName: 'zipper-mouth-face',
        url: emojiBaseUrl + 'zipper_mouth_face.png'
      },
      {
        cssName: 'raising-hands',
        url: emojiBaseUrl + 'raising_hands.png'
      },
      {
        cssName: 'hourglass',
        url: emojiBaseUrl + 'hourglass.png'
      },
      {
        cssName: 'framed-picture',
        url: emojiBaseUrl + 'framed_picture.png'
      },
      {
        cssName: 'clapping-hands',
        url: emojiBaseUrl + 'clapping_hands.png'
      },
      {
        cssName: 'waving-hand',
        url: emojiBaseUrl + 'waving_hand.png'
      }
    ];

    function addEmojiImageStyles() {
      $('head').append(`
        <style>
          .emoji-button {
            width: 70px;
            height: 70px;
            background-size: 50px 50px;
            border: 1px solid #aaa;
            background-color: rgba(255, 255, 255, 0.1);
            background-repeat: no-repeat;
            background-position: center;
            margin-right: 8px;
            margin-bottom: 8px;
          }
          .emoji-button:hover {
            border: 1px solid #ccc;
            background-color: rgba(255, 255, 255, 0.4);
            cursor: pointer;
          }
          .emoji-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0;
            margin: 0;
          }

      </style>`);
    }

    function onEmojiButtonClick(url) {
      if (timer != null) {
          clearTimeout(timer);
      }
      defaultUrl = APP.store.getState()['features/base/settings'].avatarURL;
      APP.conference.commands.sendCommand("avatar-url", { value: url });

      setTimeout(() => {
        APP.conference.commands.sendCommand("avatar-url", { value: defaultUrl })
      }, timeout);
    }

    addEmojiImageStyles();

    for (const [index, emoji] of emojis.entries()) {
        const emojiClass = 'emoji-button emoji-' + emoji['cssName']
        items.push(<button
                      type='button'
                      key={index}
                      className={emojiClass}
                      src={emoji['url']}
                      style={{backgroundImage: `url(${emoji['url']})`}}
                      onClick={() => onEmojiButtonClick(emoji['url'])}>
                    </button>)
    }

    return (
        <Dialog
            hideCancelButton = { true }
            submitDisabled = { true }
            titleKey = { 'Emoji Reaction' }
            width = 'small'>
            <div className='emoji-list'>
              {items}
            </div>
        </Dialog>
    );
}

export default EmojiReactionDialog;
