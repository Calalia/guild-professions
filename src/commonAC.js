export const fetchCommonAC = (table) => ({
  type: "FETCH_COMMON",
  payload: { table },
});
export const postCommonAC = (table, data) => ({
  type: "POST_COMMON",
  payload: { table, data },
});
export const deleteCommonAC = (table, data) => ({
  type: "DELETE_COMMON",
  payload: { table, data },
});
export const patchCommonAC = (table, data) => ({
  type: "PATCH_COMMON",
  payload: { table, data },
});
