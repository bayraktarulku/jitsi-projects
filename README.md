```This repo created  for a theme of  Jitsi Hackathon```

#### jitsi-activeSpeaker
##### active speaker's priority
- order the tileView
- order the filmstrip



##### filter by text
Updated on [MeetingParticipantList](https://github.com/bayraktarulku/jitsi-activeSpeaker/blob/main/jitsi-meet/react/features/participants-pane/components/MeetingParticipantList.js) file

useState created and assigned [] as an initial value.

```
const [filteredParticipants, setFilteredCParticipants] = useState([]);
const [search, setSearch] = useState('');
```

```
useEffect(() => {
  setFilteredCParticipants(
    participants.filter((participant) =>
      participant.name.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search, participants]);
```

```
 <FieldTextStateless
    autoFocus = { true }
    id = 'searchParticipant'
    onChange={(e) => setSearch(e.target.value)}
    placeholder = { t('Search Participant') }
    shouldFitContainer = { true }
    type = 'text'/>
```
