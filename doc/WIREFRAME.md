
# OpenRQM Client Wireframes

This file shows all the major screens of the OpenRQM Client as wireframes.

## Login View

```puml

scale max 650 width

@startsalt
{
  Login    | "Username  "
  Password | "****      "
  [Cancel  <&circle-x>] | [  OK  <&account-login> ]
}
@endsalt
```

## Workspace View

```puml

scale max 650 width

@startsalt
{
{* File | Edit | Settings | <&minus> | <&fullscreen-enter> | <&x> }
{#
}
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
```

## Document View

```puml

scale max 650 width

@startsalt
{
{* File | Edit | Review | Linking | Settings | <&minus> | <&fullscreen-enter> | <&x> }
{#
ID | Content | Requirement Type
ORQM_1 | The openrqm-server shall support a REST  call to fetch all workspaces with their attributes as JSON. | DEF 
ORQM_2 | The openrqm-server shall support a REST call to fetch all elements of a document specified by it's internal identifier as JSON. | DEF 
}
}
@endsalt
```

## Linking View

t.b.d.

## Review View

t.b.d.

## Settings View

```puml

scale max 650 width

@startsalt
{
{* Settings }
{#
ID | Content | Requirement Type

}
}
@endsalt
```

## License

SPDX-License-Identifier: GPL-2.0-only

## Copyright

Copyright (C) 2019 Benjamin Schilling