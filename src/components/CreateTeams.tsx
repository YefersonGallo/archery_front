import { Button, Card, Feed, Form, Icon, Input, Segment, SemanticCOLORS } from 'semantic-ui-react';
import React, { useState } from 'react';

type Props = {
  start: (page: number, teams: Array<{ name: string, color: SemanticCOLORS, players: Array<{ 'endurance': number, 'gender': string, 'id': number }> }>) => void
}

const CreateTeams = ({ start }: Props) => {
    const [name, setName] = useState('');
    const [flag, setFlag] = useState(true);
    const [loading, setLoading] = useState(false);
    const [teams, setTeams] = useState<Array<{ name: string, color: SemanticCOLORS, players: Array<{ 'endurance': number, 'gender': string, 'id': number }> }>>([]);
    const [teamsNumber, setTeamsNumber] = useState(1);
    const colors: Array<SemanticCOLORS> = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];

    const sendRequest = async () => {
      setLoading(true);
      setFlag(name !== '' ? true : false);
      if (name !== '') {
        const index = Math.round(Math.random() * colors.length - 1);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, color: colors[index] }),
        };
        delete colors[index];
        const responseP = await fetch('https://archery-back.herokuapp.com/create_team', requestOptions);
        const res = await responseP.json();
        setTeams(teams.concat(res));
        setName('');
        setTeamsNumber(teamsNumber + 1);
      }
      ;
      setLoading(false);
    };

    return (
      <Segment size={'huge'}>
        <Card.Group centered>
          <Card>
            <Card.Content>
              <Icon name='group' />
              <Card.Header>Crear Equipo</Card.Header>
              <Card.Description>
                Ingrese el nombre del equipo {teamsNumber}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Form>
                <Form.Field
                  control={Input}
                  error={flag ? false : 'Debe ingresar un nombre para el equipo'}
                  fluid
                  disabled={teamsNumber >= 3}
                  value={name}
                  label='Nombre del Equipo'
                  placeholder='Ingrese el nombre del equipo'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value.toString())}
                />
                <Button disabled={teamsNumber >= 3} type='submit' color={'green'} onClick={sendRequest}
                        loading={loading}>Crear</Button>
              </Form>
            </Card.Content>
          </Card>
        </Card.Group>
        <Card.Group stackable>
          {
            teams.map((team, i) => {
              return (
                <Card color={team.color} key={i}>
                  <Card.Content>
                    <Card.Header>{team.name}</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Feed>
                      {
                        team.players?.map((player, x) => {
                          return (
                            <Feed.Event key={x}>
                              <Feed.Label icon={player.gender === 'male' ? 'mars' : 'venus'} />
                              <Feed.Content>
                                <Feed.Summary>
                                  Integrante {player.id}
                                </Feed.Summary>
                              </Feed.Content>
                            </Feed.Event>
                          );
                        })
                      }
                    </Feed>
                  </Card.Content>
                </Card>
              );
            })
          }
        </Card.Group>
        <Card.Group centered>
          <Button className='button-init' size={'large'} disabled={teamsNumber < 3}
                  onClick={() => start(1, teams)}>Siguiente</Button>
        </Card.Group>
      </Segment>
    );
  }
;

export default CreateTeams;