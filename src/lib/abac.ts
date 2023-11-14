/*
interface Role {
}

interface User {
    name: string
    role?: Role[]
}

type AttributeValueType = "string" | "number" | "boolean"

interface Attribute {
    name: string
    valueType: AttributeValueType
}

interface UserAttribute extends Attribute {
}

interface ResourceAttribute extends Attribute {
}

interface RolePolicy {
    name: string
    resources?: ResourcePolicy[]
}

interface ResourcePolicy {
    name: string
    actions?: string[]
    attributes: ResourceAttribute[]
}


type OperatorPolicy = "equals" | "lessOrEquals" | "upperOrEqual" | "not equals" | "lessThan" | "upperThan"
type ConditionPolicy = {
    attribute: Attribute,
    operator: OperatorPolicy,
    value: string | number | boolean
}
type ConditionGroup = {
    conditions: ConditionPolicy[],
    joinType?: "and" | "or"
}

interface UserSet {
    name: string
    description?: string
    condition_groups?: ConditionGroup[]
}

interface ResourceSet {
    name: string
    resourceType: ResourcePolicy
    condition_groups: ConditionGroup[]
}


/!* Using interfaces *!/
const userAttributes: UserAttribute[] = [
    {name: "location", valueType: "string"},
    {name: "department", valueType: "string"},
]
const serviceResourcePolicy: ResourcePolicy = {
    actions: ["subscribe"],
    attributes: [
        {name: "cost", valueType: "number"},
        {name: "hasApproval", valueType: "boolean"}
    ],
    name: "services"
}
const rolePolicy: RolePolicy = {name: "Manager", resources: [serviceResourcePolicy]}
const user: User = {name: "John Doe"}


const engineeringUserSet: UserSet = {
    name: "Engineering Manager Based in the USA (Set)",
    description: "",
    condition_groups: [
        {
            conditions: [
                {attribute: userAttributes[0], operator: "equals", value: "USA"},
                {attribute: userAttributes[1], operator: "equals", value: "engineering"},
            ],
            joinType: "and"
        }
    ]
}
const serviceBelow500USD: ResourceSet = {
    name: "service below 500 USD",
    resourceType: serviceResourcePolicy,
    condition_groups: [
        {
            joinType: "and",
            conditions: [
                {attribute: serviceResourcePolicy.attributes[0], operator: 'lessThan', value: 500},
                {attribute: serviceResourcePolicy.attributes[1], operator: 'equals', value: true},
            ]
        }
    ]
}
const serviceAbove500USD: ResourceSet = {
    name: "service above 500 USD",
    resourceType: serviceResourcePolicy,
    condition_groups: [
        {
            joinType: "or",
            conditions: [
                {attribute: serviceResourcePolicy.attributes[0], operator: 'upperThan', value: 500},
                {attribute: serviceResourcePolicy.attributes[1], operator: 'equals', value: false},
            ]
        }
    ]
}*/
