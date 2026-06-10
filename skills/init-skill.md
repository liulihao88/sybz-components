---
name: sybz-components
description: >-
  Use this skill when migrating oeos-components and @oeos-components/utils to
  sybz-components and @sybz-components/utils while preserving all existing
  components, utilities, behavior, documentation, examples, and paths.
metadata:
  short-description: Migrate oeos-components to sybz-components
---

# sybz-components

## 迁移规则

1. 将组件库名 `oeos-components` 改为 `sybz-components`。
2. 将函数库名 `@oeos-components/utils` 改为 `@sybz-components/utils`。
3. 将所有组件前缀改为 `s`，例如 `o-button` 改为 `s-button`。
4. 保留所有组件、函数、API 和功能行为，只修改命名和路径。
5. 将相关路径、文档、包名、示例和引用统一改为 `sybz`。
6. 目标仓库为 `https://github.com/liulihao88/sybz-components`。
7. 功能应与 `https://github.com/liulihao88/oeos-components` 保持一致。
