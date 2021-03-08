import { hpe as grommet } from 'grommet-theme-hpe';
import { Box, Grommet, Heading, Paragraph } from 'grommet';

const About = () => {
  return (
    <Grommet theme={grommet}>
      <Box gridArea='header' justify='center' align='center'>
        <Heading level='3' size='medium'>Acerca de</Heading>
        <Paragraph>Los integrantes del grupo son: José Daza, Yeferson Gallo y Diego Sánchez, el trabajo hace parte del
          taller 2 de la asignatura Simulación por computador de la Escuela de Ingeniería de Sistemas y Computación
          perteneciente a la Universidad Pedagógica y Tecnológica de Colombia</Paragraph>
        <Paragraph>Marzo 2021</Paragraph>
      </Box>
    </Grommet>
  );
};

export default About;