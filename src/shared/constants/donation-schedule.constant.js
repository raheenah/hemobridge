export const ApiDonationScheduleStatus = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
};

export const UiDonationScheduleStatus = {
    PENDING: "REQUESTS",
    ACCEPTED: "SCHEDULED",
    REJECTED: "REJECTED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
};

export function mapApiToUiScheduleStatus(apiStatus) {
    if(apiStatus === ApiDonationScheduleStatus.APPROVED) return UiDonationScheduleStatus.ACCEPTED;
    return UiDonationScheduleStatus[apiStatus]
}
