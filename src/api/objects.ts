import request from "../utils/request";

interface UmlObject {
    name: string;
    type: string;
}

interface Relationship {
    from: string;
    to: string;
    type: string;
}

interface UMLParseResult {
    relationships: Relationship[];
    objects: UmlObject[];
}

interface Uml {
    uml: string;
}

// interface Common<T> {
//     code: string;
//     data: T;
//     mesg: string;
//     time: string;
// }

export const parseUml = async (uml: Uml) => {
    const response = await request<UMLParseResult>({
        method: "POST",
        url: "/api/parse-uml",
        data: uml,
    });
    return response;
}

export const saveHistory = async (payload: FormData) => {
    const response = await request({
        method: "POST",
        url: "/api/set-history",
        data: payload,
    });
    return response;
}