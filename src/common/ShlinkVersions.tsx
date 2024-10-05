import { ExternalLink } from 'react-external-link';
import type { SelectedServer } from '../servers/data';
import { isReachableServer } from '../servers/data';
import { versionToPrintable, versionToSemVer } from '../utils/helpers/version';
import pack from './../../package.json';

const SHLINK_WEB_CLIENT_VERSION = pack.version || 'latest';
const normalizeVersion = (version: string) => versionToPrintable(versionToSemVer(version));

export interface ShlinkVersionsProps {
  selectedServer: SelectedServer;
  clientVersion?: string;
}

const VersionLink = ({ _, version }: { project: 'shlink' | 'shlink-web-client'; version: string }) => (
  <ExternalLink href={`${pack.repository}/releases/${version}`} className="text-muted">
    <b>{version}</b>
  </ExternalLink>
);

export const ShlinkVersions = ({ selectedServer, clientVersion = SHLINK_WEB_CLIENT_VERSION }: ShlinkVersionsProps) => {
  const normalizedClientVersion = normalizeVersion(clientVersion);

  return (
    <small className="text-muted">
      {isReachableServer(selectedServer) && (
        <>Server: <VersionLink project="shlink" version={selectedServer.printableVersion} /> - </>
      )}
      Client: <VersionLink project="shlink-web-client" version={normalizedClientVersion} />
    </small>
  );
};
