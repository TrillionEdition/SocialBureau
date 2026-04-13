import axios from "axios";
import { BASE_URL } from "../utils/urls";

const TEAM_CACHE_KEY = "sb_team_data";
const TEAM_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Reads the team cache entry from sessionStorage.
 * Returns the parsed data if it exists and hasn't expired, otherwise null.
 */
function readLocalCache() {
  try {
    const raw = sessionStorage.getItem(TEAM_CACHE_KEY);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      sessionStorage.removeItem(TEAM_CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Writes data to the sessionStorage cache with a TTL timestamp.
 */
function writeLocalCache(data) {
  try {
    sessionStorage.setItem(
      TEAM_CACHE_KEY,
      JSON.stringify({ data, expiresAt: Date.now() + TEAM_CACHE_TTL_MS })
    );
  } catch {
    // sessionStorage may be full or unavailable — continue without caching
  }
}

export const teamService = {
  /**
   * Fetches the full team data object.
   * Layer 1: sessionStorage (client-side cache, 24 h TTL)
   * Layer 2: Backend GET /team   (Redis-cached on the server, 24 h TTL)
   * Layer 3: Static fallback     (if network/server is unavailable)
   *
   * @param {boolean} [forceRefresh=false] - Bypass all caches and hit the origin.
   * @returns {Promise<Record<string, Array>>} team data object
   */
  getTeam: async (forceRefresh = false) => {
    // Layer 1: client-side sessionStorage cache
    if (!forceRefresh) {
      const local = readLocalCache();
      if (local) return local;
    }

    // Layer 2: backend API (Redis-cached server-side)
    const res = await axios.get(`${BASE_URL}/team`);
    const data = res.data?.data;
    if (data) {
      writeLocalCache(data);
      return data;
    }

    throw new Error("Invalid team data response from server");
  },

  /**
   * Invalidates both the client-side sessionStorage cache and the
   * server-side Redis cache, then re-fetches fresh data.
   */
  invalidateAndRefetch: async () => {
    sessionStorage.removeItem(TEAM_CACHE_KEY);
    // Bust the server-side Redis cache
    await axios.post(`${BASE_URL}/team/invalidate`);
    return teamService.getTeam(true);
  },
};
