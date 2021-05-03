// @flow

import React from 'react';
import { Dialog, hideDialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';


function EmojiReactionDialog() {

    const items = []
    const timeout = 30 * 1000;
    let timer = null;
    let defaultUrl = undefined;

    const emojiBaseUrl = 'https://cdn.joypixels.com/products/previews/O6D7BMG8R2DMMNC4LLZH/';

    const emojis = [
      {
        url: emojiBaseUrl + '2301_K2D71kEFdlh7edrAnz37xqUN6YtWKPWV.gif'
      },
      {
        url: emojiBaseUrl + '2368_YN8wAWhgKpcWwZ9z3kp92yi5XYbTs41M.gif'
      },
      {
        url: emojiBaseUrl + '2299_D8w9epwATnx7nUUSfL2bolEOtQeYSIsj.gif'
      },
      {
        url: emojiBaseUrl + '2302_0i9FuobGWAIV6HGA1DnYpwjV0C7xsczY.gif'
      },
      {
        url: emojiBaseUrl + '2305_biSFwtwQo6OpAc8fZNL0sRSTtJXE4hMT.gif'
      },
      {
        url: emojiBaseUrl + '2311_1hGcwOlOK6CDJaItpeRaYzO1Lh8DPFFK.gif'
      },
      {
        url: emojiBaseUrl + '2294_v9gou58f95fvxtzRcwiev0PQ7qOfTH0R.gif'
      },
      {
        url: emojiBaseUrl + '2324_b569aOoF2SsK5hFJJlu9wyaO5GP8rviH.gif'
      },
      {
        url: emojiBaseUrl + '2322_Mp092btDRSEdBd8Vr6CN3mCfAfojUL5A.gif'
      },
      {
        url: emojiBaseUrl + '2316_HIkAdOffUQSW0Q8Or1RWID8zJXydFTVy.gif'
      },
      {
        url: emojiBaseUrl + '2313_CBIZSYf2FIf54UaSSwbIVrJLn5ocTiRO.gif'
      },
      {
        url: emojiBaseUrl + '2320_MbuJVKxLjnyPj99OZhv3X2a7re4UdZ6B.gif'
      },
      {
        url: emojiBaseUrl + '2330_WFboV6pFArbEbK6RAMXT9xxhWf7aLaUx.gif'
      },
      {
        url: emojiBaseUrl + '2325_HMMg8klxSQK2Kbiydo224dm3RT2DeHgM.gif'
      },
      {
        url: emojiBaseUrl + '2315_u2lwfmcJ0d46yPleVzD4EgmRvziESzUV.gif'
      },
      {
        url: emojiBaseUrl + '2372_UfDDs2sTsTLiu6LJE7m3aCTkLX9fztVZ.gif'
      },
      {
        url: emojiBaseUrl + '2307_SKZQnrg7Ziqu1gI59XIeG42vOXDu44jW.gif'
      },
      {
        url: emojiBaseUrl + '2309_eLd4s2npRD1HBbtT9IcXwy0RHYugMLjo.gif'
      },
      {
        url: emojiBaseUrl + '2369_5OGJpE7Qgy2l7rjmGH6LyWLltQzw3moz.gif'
      },
      {
        url: emojiBaseUrl + '2332_RCzlB4jrR8ETuzqKU0wVXmu1qBQP5SuN.gif'
      },
      {
        url: emojiBaseUrl + '2405_BmRDXqJsxy7WsAcX11FOzO53HMWkZ63O.gif'
      },
      {
        url: emojiBaseUrl + '2400_2JoADz74WYIcKBdYxLTTAboVaqCKEAbq.gif'
      },
      {
        url: emojiBaseUrl + '2402_F52AqOaPz52RLBTiwBtZUMhlkm4mahDl.gif'
      },
      {
        url: emojiBaseUrl + '2403_w0DOW7F5wDNbkNkPi88v9zgHneqZ0pQj.gif'
      },
      {
        url: emojiBaseUrl + '2411_HZWARHWk0TImR0UBwvuHRUXPorcBwWs1.gif'
      },
    ];

    function addEmojiImageStyles() {
      $('head').append(`
        <style>
          .emoji-button {
            width: 62px;
            height: 62px;
            background-size: 55px 55px;
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
      const isVideoMuted = APP.conference.isLocalVideoMuted();
      !isVideoMuted ? APP.conference.muteVideo(true) : '';
      APP.conference.commands.sendCommand("avatar-url", { value: url });
      APP.store.dispatch(hideDialog());
      setTimeout(() => {
        APP.conference.commands.sendCommand("avatar-url", { value: defaultUrl })
        !isVideoMuted ? APP.conference.muteVideo(false) : '';
      }, timeout);
    }

    addEmojiImageStyles();

    for (const [index, emoji] of emojis.entries()) {
        items.push(<button
                      type='button'
                      key={index}
                      className='emoji-button'
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
