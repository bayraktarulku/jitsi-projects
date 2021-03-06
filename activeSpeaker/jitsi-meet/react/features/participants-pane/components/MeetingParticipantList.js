// @flow

import { FieldTextStateless } from '@atlaskit/field-text';
import _ from 'lodash';
import React, { useCallback, useRef, useState , useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getParticipants } from '../../base/participants';
import { findStyledAncestor } from '../functions';

import { InviteButton } from './InviteButton';
import { MeetingParticipantContextMenu } from './MeetingParticipantContextMenu';
import { MeetingParticipantItem } from './MeetingParticipantItem';
import { Heading, ParticipantContainer } from './styled';

type NullProto = {
  [key: string]: any,
  __proto__: null
};

type RaiseContext = NullProto | {

  /**
   * Target elements against which positioning calculations are made
   */
  offsetTarget?: HTMLElement,

  /**
   * Participant reference
   */
  participant?: Object,
};

const initialState = Object.freeze(Object.create(null));

export const MeetingParticipantList = () => {
    const isMouseOverMenu = useRef(false);
    const participants = useSelector(getParticipants, _.isEqual);
    const [ raiseContext, setRaiseContext ] = useState<RaiseContext>(initialState);
    const [filteredParticipants, setFilteredParticipants] = useState([]);
    const [search, setSearch] = useState('');
    const { t } = useTranslation();

    const lowerMenu = useCallback(() => {
        /**
         * We are tracking mouse movement over the active participant item and
         * the context menu. Due to the order of enter/leave events, we need to
         * defer checking if the mouse is over the context menu with
         * queueMicrotask
         */
        window.queueMicrotask(() => {
            if (isMouseOverMenu.current) {
                return;
            }

            if (raiseContext !== initialState) {
                setRaiseContext(initialState);
            }
        });
    }, [ raiseContext ]);

    const raiseMenu = useCallback((participant, target) => {
        setRaiseContext({
            participant,
            offsetTarget: findStyledAncestor(target, ParticipantContainer)
        });
    }, [ raiseContext ]);

    const toggleMenu = useCallback(participant => e => {
        const { participant: raisedParticipant } = raiseContext;

        if (raisedParticipant && raisedParticipant === participant) {
            lowerMenu();
        } else {
            raiseMenu(participant, e.target);
        }
    }, [ raiseContext ]);

    const menuEnter = useCallback(() => {
        isMouseOverMenu.current = true;
    }, []);

    const menuLeave = useCallback(() => {
        isMouseOverMenu.current = false;
        lowerMenu();
    }, [ lowerMenu ]);

    useEffect(() => {
      setFilteredParticipants(
        participants.filter((participant) =>
          search ? participant.name.toLowerCase().includes(search.toLowerCase()) : participant
        )
      );
    }, [search, participants]);

    return (
    <>
        <Heading>{t('participantsPane.headings.participantsList', { count: participants.length })}</Heading>
        <InviteButton />
        <FieldTextStateless
            autoFocus = { true }
            id = 'searchParticipant'
            onChange={(e) => setSearch(e.target.value)}
            placeholder = { 'Search Participant' }
            shouldFitContainer = { true }
            type = 'text'/>
        <div>
            {filteredParticipants.map((p) => (
                <MeetingParticipantItem
                    isHighlighted = { raiseContext.participant === p }
                    key = { p.id }
                    onContextMenu = { toggleMenu(p) }
                    onLeave = { lowerMenu }
                    participant = { p } /> : null
            ))}
        </div>
        <MeetingParticipantContextMenu
            onEnter = { menuEnter }
            onLeave = { menuLeave }
            onSelect = { lowerMenu }
            { ...raiseContext } />
    </>
    );
};

