import { Alert, Platform } from "react-native";
import showAlert from "../showAlert";


jest.spyOn(Alert, "alert").mockImplementation(() => { });

describe("showAlert", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls Alert.alert on native platforms (iOS/Android)", () => {
    Object.defineProperty(Platform, "OS", { value: "android" });
    showAlert("Hello", "Native test");
    expect(Alert.alert).toHaveBeenCalledWith("Hello", "Native test");
  });

  it("calls browser alert on web", () => {
    Object.defineProperty(Platform, "OS", { value: "web" });


    if (!global.alert) {
      global.alert = () => { };
    }

    const alertSpy = jest.spyOn(global, "alert").mockImplementation(() => { });
    showAlert("Title", "Web test");
    expect(alertSpy).toHaveBeenCalledWith("Title\n\nWeb test");
    alertSpy.mockRestore();
  });
});