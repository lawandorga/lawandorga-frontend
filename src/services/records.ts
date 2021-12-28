import { HasPermission } from "@/types/core";
import {
  Consultant,
  Country,
  Message,
  Record,
  RecordDeletionRequest,
  RecordPermissionRequest,
  RecordsClient,
  RecordsDocument,
  QuestionnaireTemplate,
  Questionnaire,
  Tag,
  Pool,
  QuestionnaireAnswer,
  QuestionnaireQuestion,
  QuestionnaireTemplateFile,
  RecordTemplate,
  RecordEntry,
} from "@/types/records";
import { JsonModel } from "@/types/shared";
import downloadFile from "@/utils/download";
import axios from "../api";

class RecordsService {
  // record templates
  getTemplates(): Promise<RecordTemplate[]> {
    return axios
      .get<RecordTemplate[]>("records/recordtemplates/")
      .then((response) => response.data);
  }

  createTemplate(data: JsonModel): Promise<RecordTemplate> {
    return axios
      .post<RecordTemplate>(`records/recordtemplates/`, data)
      .then((response) => response.data);
  }

  getTemplate(id: string | number): Promise<RecordTemplate> {
    return axios
      .get<RecordTemplate>(`record/recordtemplates/${id}/`)
      .then((response) => response.data);
  }

  updateTemplate(template: RecordTemplate): Promise<RecordTemplate> {
    return axios
      .patch<RecordTemplate>(
        `records/recordtemplates/${template.id}/`,
        template,
      )
      .then((response) => response.data);
  }

  deleteTemplate(template: RecordTemplate): Promise<void> {
    return axios
      .delete(`records/recordtemplates/${template.id}/`)
      .then((response) => response.data);
  }

  // records
  getRecords(): Promise<Record[]> {
    return axios
      .get<Record[]>("records/records/")
      .then((response) => response.data);
  }

  getRecord(id: number | string): Promise<Record> {
    return axios
      .get<Record>(`records/records/${id}/`)
      .then((response) => response.data);
  }

  createRecord(data: JsonModel): Promise<Record> {
    return axios
      .post<Record>("records/records/", data)
      .then((response) => response.data);
  }

  updateRecord(record: Record): Promise<Record> {
    return axios
      .patch<Record>(`records/oldrecords/${record.id}/`, record)
      .then((response) => response.data);
  }

  deleteRecord(record: Record): Promise<void> {
    return axios.delete(`records/oldrecords/${record.id}/`).then();
  }

  // entries
  createEntry(data: JsonModel): Promise<RecordEntry> {
    return axios
      .post<RecordEntry>(data.url as string, data)
      .then((response) => response.data);
  }

  updateEntry(data: JsonModel): Promise<RecordEntry> {
    return axios
      .patch<RecordEntry>(data.url as string, data)
      .then((response) => response.data);
  }

  // permissions
  getGeneralPermissions(): Promise<HasPermission[]> {
    return axios
      .get<HasPermission[]>("has_permission/records/")
      .then((response) => response.data);
  }

  // questionnairetemplate
  getQuestionnaireTemplates(): Promise<QuestionnaireTemplate[]> {
    return axios
      .get<QuestionnaireTemplate[]>("records/questionnairetemplates/")
      .then((response) => response.data);
  }

  getQuestionnaireTemplate(
    id: number | string,
  ): Promise<QuestionnaireTemplate> {
    return axios
      .get<QuestionnaireTemplate>(`records/questionnairetemplates/${id}/`)
      .then((response) => response.data);
  }

  createQuestionnaireTemplate(
    questionnaire: QuestionnaireTemplate,
  ): Promise<QuestionnaireTemplate> {
    return axios
      .post<QuestionnaireTemplate>(
        "records/questionnairetemplates/",
        questionnaire,
      )
      .then((response) => response.data);
  }

  updateQuestionnaireTemplate(
    questionnaire: QuestionnaireTemplate,
  ): Promise<QuestionnaireTemplate> {
    return axios
      .patch<QuestionnaireTemplate>(
        `records/questionnairetemplates/${questionnaire.id}/`,
        questionnaire,
      )
      .then((response) => response.data);
  }

  deleteQuestionnaireTemplate(
    questionnaire: QuestionnaireTemplate,
  ): Promise<void> {
    return axios.delete(`records/questionnairetemplates/${questionnaire.id}/`);
  }

  // questionnairequestion
  getQuestionnaireQuestions(
    questionnaire: QuestionnaireTemplate,
  ): Promise<QuestionnaireQuestion[]> {
    return axios
      .get<QuestionnaireQuestion[]>(
        `records/questionnairetemplates/${questionnaire.id}/fields/`,
      )
      .then((response) => response.data);
  }

  createQuestionnaireQuestion(
    field: QuestionnaireQuestion,
  ): Promise<QuestionnaireQuestion> {
    return axios
      .post<QuestionnaireQuestion>("records/questionnaire_fields/", field)
      .then((response) => response.data);
  }

  updateQuestionnaireQuestion(
    field: QuestionnaireQuestion,
  ): Promise<QuestionnaireQuestion> {
    return axios
      .patch<QuestionnaireQuestion>(
        `records/questionnaire_fields/${field.id}/`,
        field,
      )
      .then((response) => response.data);
  }

  deleteQuestionnaireQuestion(field: QuestionnaireQuestion): Promise<void> {
    return axios.delete(`records/questionnaire_fields/${field.id}/`);
  }

  // questionnaire
  getQuestionnaires(id: number | string): Promise<Questionnaire[]> {
    return axios
      .get<Questionnaire[]>(`records/questionnaires/?record=${id}`)
      .then((response) => response.data);
  }

  createQuestionnaire(
    recordQuestionnaire: Questionnaire,
  ): Promise<Questionnaire> {
    return axios
      .post<Questionnaire>(
        `records/questionnairetemplates/publish/`,
        recordQuestionnaire,
      )
      .then((response) => response.data);
  }

  deleteQuestionnaire(recordQuestionnaire: Questionnaire): Promise<void> {
    return axios
      .delete(`records/questionnaires/${recordQuestionnaire.id}/`)
      .then();
  }

  getQuestionnaire(code: string): Promise<Questionnaire> {
    return axios
      .get(`records/questionnaires/${code}/`)
      .then((response) => response.data);
  }

  sendQuestionnaireAnswer(
    data: JsonModel,
    recordQuestionnaire: Questionnaire,
  ): Promise<Questionnaire> {
    return axios
      .patch<Questionnaire>(
        `records/questionnaires/${recordQuestionnaire.id}/`,
        data,
      )
      .then((response) => response.data);
  }

  // questionnaireanswer
  downloadQuestionnaireAnswerFile(
    questionnaireAnswer: QuestionnaireAnswer,
  ): void {
    axios
      .get<Blob>(
        `records/questionnaire_answers/${questionnaireAnswer.id}/download_file/`,
        {
          responseType: "blob",
        },
      )
      .then((response) =>
        downloadFile(
          response,
          questionnaireAnswer.data.split("/").at(-1) || "filename",
        ),
      );
  }

  // questionnairefile
  getQuestionnaireFiles(
    questionnaire: QuestionnaireTemplate,
  ): Promise<QuestionnaireTemplateFile[]> {
    return axios
      .get<QuestionnaireTemplateFile[]>(
        `records/questionnairetemplates/${questionnaire.id}/files/`,
      )
      .then((response) => response.data);
  }

  downloadQuestionnaireFile(file: QuestionnaireTemplateFile): void {
    axios
      .get<Blob>(`records/questionnaire_files/${file.id}/`, {
        responseType: "blob",
      })
      .then((response) => downloadFile(response, file.name));
  }

  createQuestionnaireFile(
    file: QuestionnaireTemplateFile,
  ): Promise<QuestionnaireTemplateFile> {
    return axios
      .post<QuestionnaireTemplateFile>("records/questionnaire_files/", file)
      .then((response) => response.data);
  }

  deleteQuestionnaireFile(file: QuestionnaireTemplateFile): Promise<void> {
    return axios.delete(`records/questionnaire_files/${file.id}/`).then();
  }

  // messages
  getMessages(id: string | number): Promise<Message[]> {
    return axios
      .get<Message[]>(`records/messages/?record=${id}`)
      .then((response) => response.data);
  }

  createMessage(data: JsonModel): Promise<Message> {
    return axios
      .post<Message>(`records/messages/`, data)
      .then((response) => response.data);
  }

  // documents
  getDocuments(id: number | string): Promise<RecordsDocument[]> {
    return axios
      .get<RecordsDocument[]>(`records/records/${id}/documents/`)
      .then((response) => response.data);
  }

  createDocument(document: RecordsDocument): Promise<RecordsDocument> {
    return axios
      .post<RecordsDocument>(`records/record_documents/`, document)
      .then((response) => response.data);
  }

  downloadDocument(document: RecordsDocument): void {
    axios
      .get<Blob>(`records/record_documents/${document.id}/`, {
        responseType: "blob",
      })
      .then((response) => downloadFile(response, document.name));
  }

  deleteDocument(document: RecordsDocument): Promise<void> {
    return axios.delete(`records/record_documents/${document.id}/`).then();
  }

  // client
  getClient(id: number): Promise<RecordsClient> {
    return axios
      .get<RecordsClient>(`records/e_clients/${id}/`)
      .then((response) => response.data);
  }

  updateClient(client: RecordsClient): Promise<RecordsClient> {
    return axios
      .patch<RecordsClient>(`records/e_clients/${client.id}/`, client)
      .then((response) => response.data);
  }

  // consultants
  getConsultants(): Promise<Consultant[]> {
    return axios
      .get<Consultant[]>("records/consultants/")
      .then((response) => response.data);
  }

  // tags
  getTags(): Promise<Tag[]> {
    return axios.get<Tag[]>(`records/tags/`).then((response) => response.data);
  }

  createTag(tag: Tag): Promise<Tag> {
    return axios
      .post<Tag>("records/tags/", tag)
      .then((response) => response.data);
  }

  updateTag(tag: Tag): Promise<Tag> {
    return axios
      .patch<Tag>(`records/tags/${tag.id}/`, tag)
      .then((response) => response.data);
  }

  deleteTag(tag: Tag): Promise<void> {
    return axios.delete(`records/tags/${tag.id}/`);
  }

  // countries
  getCountries(): Promise<Country[]> {
    return axios
      .get<Country[]>("records/origin_countries/")
      .then((response) => response.data);
  }

  // permission
  getPermissionRequests(): Promise<RecordPermissionRequest[]> {
    return axios
      .get<RecordPermissionRequest[]>("records/record_permission_requests/")
      .then((response) => response.data);
  }

  updatePermissionRequest(
    data: RecordPermissionRequest,
  ): Promise<RecordPermissionRequest> {
    return axios
      .patch<RecordPermissionRequest>(
        `records/record_permission_requests/${data.id}/`,
        data,
      )
      .then((response) => response.data);
  }

  requestAccess(record: Record): Promise<RecordPermissionRequest> {
    return axios
      .post<RecordPermissionRequest>(
        `records/oldrecords/${record.id}/request_permission/`,
      )
      .then((response) => response.data);
  }

  // deletion-requests
  getDeletionRequests(): Promise<RecordDeletionRequest[]> {
    return axios
      .get<RecordDeletionRequest[]>("records/record_deletion_requests/")
      .then((response) => response.data);
  }

  createDeletionRequest(
    deletionRequest: RecordDeletionRequest,
  ): Promise<RecordDeletionRequest> {
    return axios
      .post<RecordDeletionRequest>(
        "records/record_deletion_requests/",
        deletionRequest,
      )
      .then((response) => response.data);
  }

  updateDeletionRequest(
    data: RecordDeletionRequest,
  ): Promise<RecordDeletionRequest> {
    return axios
      .patch<RecordDeletionRequest>(
        `records/record_deletion_requests/${data.id}/`,
        data,
      )
      .then((response) => response.data);
  }

  // pool
  getPool(): Promise<Pool> {
    return axios
      .get<Pool>("records/record_pool/")
      .then((response) => response.data);
  }

  yieldRecord(data: JsonModel): Promise<void> {
    return axios.post("records/pool_records/", { record: data.record }).then();
  }

  enlist(): Promise<string> {
    return axios
      .post<{ action: string }>("records/pool_consultants/", {})
      .then((response) => {
        const message =
          response.data.action === "created"
            ? "You enlisted successfully into the record pool."
            : "You've been given a record";
        return message;
      });
  }
}

export default new RecordsService();
