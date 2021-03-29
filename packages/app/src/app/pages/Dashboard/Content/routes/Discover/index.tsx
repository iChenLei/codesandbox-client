import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Stack,
  Text,
  Element,
  Grid,
  Column,
  Link,
} from '@codesandbox/components';
import css from '@styled-system/css';
import {
  GRID_MAX_WIDTH,
  GUTTER,
} from 'app/pages/Dashboard/Components/VariableGrid';

export const Discover = () => (
  <>
    <Helmet>
      <title>Discover - CodeSandbox</title>
    </Helmet>
    <Element
      css={css({
        marginX: 'auto',
        width: `calc(100% - ${2 * GUTTER}px)`,
        maxWidth: GRID_MAX_WIDTH - 2 * GUTTER,
        paddingTop: 10,
      })}
    >
      <Stack
        align="center"
        css={css({
          width: '100%',
          height: 195,
          background: 'linear-gradient(#422677, #392687)',
          borderRadius: 'medium',
          position: 'relative',
          marginBottom: 12,
        })}
      >
        <Stack direction="vertical" marginLeft={6} css={{ zIndex: 2 }}>
          <Text size={4} marginBottom={2}>
            NEW FEATURE
          </Text>
          <Text size={9} weight="bold" marginBottom={1}>
            Discover Search
          </Text>
          <Text size={5} css={{ opacity: 0.5 }}>
            Blazzy fast to search files inside your sandbox.
          </Text>
        </Stack>
        <Element
          as="img"
          src="/static/img/discover-banner-decoration.png"
          css={css({
            position: 'absolute',
            right: 0,
            zIndex: 1,
            opacity: [0.5, 1, 1],
          })}
        />
      </Stack>

      <Grid marginBottom={16}>
        <Column>hi</Column>
      </Grid>

      <Stack direction="vertical" gap={6}>
        <Stack justify="space-between">
          <Text size={4} weight="bold">
            Learn React
          </Text>
          <Link size={4} variant="muted">
            See all →
          </Link>
        </Stack>

        <Grid>
          <Column>hi</Column>
        </Grid>
      </Stack>
    </Element>
  </>
);
