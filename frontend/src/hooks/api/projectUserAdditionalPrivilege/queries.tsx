import { PackRule, unpackRules } from "@casl/ability/extra";
import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@app/config/request";

import { TProjectPermission } from "../roles/types";
import { TProjectUserPrivilege } from "./types";

export const projectUserPrivilegeKeys = {
  details: (privilegeId: string) => ["project-user-privilege", { privilegeId }] as const,
  list: (projectMembershipId: string) =>
    ["project-user-privileges", { projectMembershipId }] as const
};

const fetchProjectUserPrivilegeDetails = async (privilegeId: string) => {
  const {
    data: { privilege }
  } = await apiRequest.get<{
    privilege: Omit<TProjectUserPrivilege, "permissions"> & { permissions: unknown };
  }>(`/api/v1/additional-privilege/users/${privilegeId}`);
  return {
    ...privilege,
    permissions: unpackRules(privilege.permissions as PackRule<TProjectPermission>[])
  };
};

export const useGetProjectUserPrivilegeDetails = (privilegeId: string) => {
  return useQuery({
    enabled: Boolean(privilegeId),
    queryKey: projectUserPrivilegeKeys.details(privilegeId),
    queryFn: () => fetchProjectUserPrivilegeDetails(privilegeId)
  });
};

export const useListProjectUserPrivileges = (projectMembershipId: string) => {
  return useQuery({
    enabled: Boolean(projectMembershipId),
    queryKey: projectUserPrivilegeKeys.list(projectMembershipId),
    queryFn: async () => {
      const {
        data: { privileges }
      } = await apiRequest.get<{
        privileges: Array<Omit<TProjectUserPrivilege, "permissions"> & { permissions: unknown }>;
      }>("/api/v1/additional-privilege/users", { params: { projectMembershipId } });
      return privileges.map((el) => ({
        ...el,
        permissions: unpackRules(el.permissions as PackRule<TProjectPermission>[])
      }));
    }
  });
};
