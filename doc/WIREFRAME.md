
# OpenRQM Client Wireframes

This file shows all the major screens of the OpenRQM Client as wireframes.

## Login View

```plantuml
@startuml
scale max 650 width

@startsalt
{
  Login    | "Username  "
  Password | "****      "
  [Cancel  <&circle-x>] | [  OK  <&account-login> ]
}
@endsalt
@enduml
```

## Workspace View

```plantuml
@startuml

scale max 650 width

@startsalt
{
{* File | Edit | Settings | <&minus> | <&fullscreen-enter> | <&x> }
{T
 + openrqm-server-id
 ++ Workspace One
 +++ Document One
 +++ Workspace One-One
 ++++ Document Two
 ++++ Document Three
 +++ Document Four
 ++ Workspace Two
 +++ Document Five
 +++ Workspace Two-One
 ++++ Document Six
 ++ Workspace Three
}
}
@endsalt
@enduml
```

## Document View

```plantuml
@startuml

scale max 650 width

@startsalt
{
{* File | Edit | Review | Linking | <&minus> | <&fullscreen-enter> | <&x> }
{#
ID | Content | Requirement Type | Links
ORQM_1 | DEF  | The openrqm-server shall support a REST endpoint to fetch all workspaces with their attributes as JSON. | Realized by: ORQM_SRV_1
ORQM_2 | DEF  | The openrqm-server shall support a REST endpoint to fetch all elements of a document specified by it's internal identifier as JSON. | Realized by: ORQM_SRV_2
}
}
@endsalt
@enduml
```

## Linking View

t.b.d.

## Review View

t.b.d.

## License

SPDX-License-Identifier: GPL-2.0-only

## Copyright

Copyright (C) 2019 Benjamin Schilling