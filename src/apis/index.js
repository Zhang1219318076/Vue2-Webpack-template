import http from "../utils/http";
export function save() {
  return http({
    url: "",
    method: "POST",
  });
}
