import { Button, Card, Feed, Form, Icon, Input, Segment } from 'semantic-ui-react';
import React, { useState } from 'react';

const CreateTeams = () => {
    const [name, setName] = useState('');
    const [flag, setFlag] = useState(true);
    const [teams, setTeams] = useState<Array<{ name?: string, players?: Array<{ 'endurance': number, 'gender': string, 'id': number }> }>>([]);
    const [teamsNumber, setTeamsNumber] = useState(1);

    const sendRequest = async () => {
      setFlag(name !== '' ? true : false);
      if (name !== '') {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name }),
        };
        const responseP = await fetch('http://localhost:5000/create_team', requestOptions);
        const res = await responseP.json();
        setTeams(teams.concat(res));
        setName('');
        setTeamsNumber(teamsNumber + 1);
      }
      ;
    };

    return (
      <Segment size={'huge'}>
        <Card.Group stackable>
          <Card >
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
                <Button disabled={teamsNumber >= 3} type='submit' color={'green'} onClick={sendRequest}>Crear</Button>
              </Form>
            </Card.Content>
          </Card>
          {
            teams.map((team) => {
              return (
                <Card>
                  <Card.Content>
                    <Card.Header>{team.name}</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Feed>
                      {
                        team.players?.map((player) => {
                          return (
                            <Feed.Event>
                              <Feed.Label icon={player.gender === 'male' ? 'mars stroke' : 'venus'} />
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
        <Button className="button-init" size={"large"} disabled={teamsNumber < 3} >Iniciar Juego</Button>
      </Segment>
    );
  }
;

export default CreateTeams;