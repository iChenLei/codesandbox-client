import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Stack,
  Text,
  Element,
  Grid,
  Column,
  Link,
  Avatar,
} from '@codesandbox/components';
import css from '@styled-system/css';

import { useAppState, useActions } from 'app/overmind';
import { sandboxesTypes } from 'app/overmind/namespaces/dashboard/types';

import { SelectionProvider } from 'app/pages/Dashboard/Components/Selection';
import {
  GRID_MAX_WIDTH,
  GUTTER,
} from 'app/pages/Dashboard/Components/VariableGrid';
import { CommunitySandbox } from 'app/pages/Dashboard/Components/CommunitySandbox';
import { Stats } from 'app/pages/Dashboard/Components/CommunitySandbox/CommunitySandboxCard';
import { AnonymousAvatar } from 'app/pages/Dashboard/Components/CommunitySandbox/AnonymousAvatar';
import { Album } from 'app/graphql/types';
import { DashboardCommunitySandbox } from 'app/pages/Dashboard/types';
import { PICKED_SANDBOXES_ALBUM } from './contants';

export const Discover = () => {
  const {
    activeTeam,
    dashboard: { sandboxes, curatedAlbums },
  } = useAppState();

  const {
    dashboard: { getPage },
  } = useActions();

  React.useEffect(() => {
    getPage(sandboxesTypes.DISCOVER);
    if (!sandboxes.LIKED) getPage(sandboxesTypes.LIKED);
  }, [getPage, sandboxes.LIKED]);

  const pickedSandboxesAlbum = curatedAlbums.find(
    album => album.id === PICKED_SANDBOXES_ALBUM
  );

  const flatAlbumSandboxes = Array.prototype.concat.apply(
    [],
    curatedAlbums.map(album => album.sandboxes)
  );

  const selectionItems: DashboardCommunitySandbox[] = flatAlbumSandboxes.map(
    sandbox => ({
      type: 'community-sandbox',
      sandbox,
    })
  );

  return (
    <Element
      css={{ width: '100%', '#selection-container': { overflowY: 'auto' } }}
    >
      <Helmet>
        <title>Discover - CodeSandbox</title>
      </Helmet>
      <SelectionProvider
        activeTeamId={activeTeam}
        page="discover"
        items={selectionItems}
      >
        <Element
          css={css({
            marginX: 'auto',
            width: `calc(100% - ${2 * GUTTER}px)`,
            maxWidth: GRID_MAX_WIDTH - 2 * GUTTER,
            paddingY: 10,
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

          <Stack direction="vertical" gap={16}>
            <Grid
              rowGap={6}
              columnGap={6}
              css={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                height: '528px',
                overflow: 'hidden',
              }}
            >
              {pickedSandboxesAlbum?.sandboxes.map(sandbox => (
                <Element
                  key={sandbox.id}
                  css={{
                    position: 'relative',
                    button: { color: 'white' },
                    span: { color: 'white' },
                  }}
                >
                  <Element
                    as="iframe"
                    src={`https://${sandbox.id}.codesandbox.dev?standalone=1`}
                    css={css({
                      backgroundColor: 'white',
                      width: '100%',
                      height: '528px',
                      borderRadius: '4px',
                      border: '1px solid',
                      borderColor: 'grays.600',
                    })}
                    scrolling="no"
                    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  />
                  <Stack
                    justify="space-between"
                    align="center"
                    gap={2}
                    css={css({
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      background: 'linear-gradient(transparent, #242424)',
                      padding: 4,
                      paddingRight: 3,
                    })}
                  >
                    <Stack
                      align="center"
                      gap={2}
                      css={{ flexShrink: 1, overflow: 'hidden' }}
                    >
                      {sandbox.author.username ? (
                        <Avatar
                          css={css({
                            size: 6,
                            borderRadius: 2,
                            img: { borderColor: 'white' },
                          })}
                          user={sandbox.author}
                        />
                      ) : (
                        <AnonymousAvatar />
                      )}
                      <Text size={3} maxWidth="100%">
                        {sandbox.author.username || 'Anonymous'}
                      </Text>
                    </Stack>

                    <Stats
                      likeCount={sandbox.likeCount}
                      forkCount={sandbox.forkCount}
                      liked={false}
                      onLikeToggle={() => {}}
                    />
                  </Stack>
                </Element>
              ))}
            </Grid>

            {curatedAlbums
              .filter(album => album.id !== PICKED_SANDBOXES_ALBUM)
              .map(album => (
                <Section
                  key={album.id}
                  album={album}
                  showMore={album.sandboxes.length > 3}
                />
              ))}
          </Stack>
        </Element>
      </SelectionProvider>
    </Element>
  );
};

type SectionTypes = { album: Album; showMore: boolean };
const Section: React.FC<SectionTypes> = ({ album, showMore = false }) => {
  const {
    dashboard: { sandboxes },
  } = useAppState();

  const likedSandboxIds = (sandboxes.LIKED || []).map(sandbox => sandbox.id);

  return (
    <Stack key={album.id} direction="vertical" gap={6}>
      <Stack justify="space-between">
        <Text size={4} weight="bold">
          {album.title}
        </Text>
        {showMore && (
          <Link size={4} variant="muted">
            See all →
          </Link>
        )}
      </Stack>

      <Grid
        id="variable-grid"
        rowGap={6}
        columnGap={6}
        css={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        {album.sandboxes.slice(0, 3).map(sandbox => (
          <Column key={sandbox.id}>
            <CommunitySandbox
              isScrolling={false}
              item={{
                type: 'community-sandbox',
                noDrag: true,
                autoFork: false,
                sandbox: {
                  ...sandbox,
                  liked: likedSandboxIds.includes(sandbox.id),
                },
              }}
            />
          </Column>
        ))}
        <div />
        <div />
      </Grid>
    </Stack>
  );
};
