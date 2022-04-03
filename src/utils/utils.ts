/** Class with common utils */
export class Utils {
  /**
   * Compare two versions an asserts if there is an update pending.
   * @param local String containing the local version number.
   * @param remote String containing the remote version number.
   * @returns Boolean indicating if the remote version is mayor.
   */
  static isUpdated(local: string, remote: string): boolean {
    if (local.localeCompare(remote) == 0) {
      return true;
    }
    const [localMayor, localMinor, localPatch] = local
      .split(".")
      .map((e: string) => parseInt(e));
    const [remoteMayor, remoteMinor, remotePatch] = remote
      .split(".")
      .map((e: string) => parseInt(e));
    if (
      typeof localMayor === "number" &&
      typeof localMinor === "number" &&
      typeof localPatch === "number" &&
      typeof remoteMayor === "number" &&
      typeof remoteMinor === "number" &&
      typeof remotePatch === "number" &&
      (localMayor > remoteMayor ||
        (localMayor >= remoteMayor && localMinor > remoteMinor) ||
        (localMayor >= remoteMayor &&
          localMinor >= remoteMinor &&
          localPatch >= remotePatch))
    ) {
      return true;
    }
    return false;
  }
}