import observable = require("data/observable");
import pages = require("ui/page");
import frame = require("ui/frame");
import gestures = require("ui/gestures");
import examplesVM = require("../view-models/examples-model")
import mainPageVM = require("../view-models/main-page-view-model");
import groupPageVM = require("../view-models/group-page-view-model");
import examplePageVM = require("../view-models/example-info-page-view-model");
import navigator = require("../common/navigator");

var page;

export function onPageLoaded(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;
    page.bindingContext = mainPageVM.instance;

    if (page.ios) {
        // TODO: Making the navigation bar transparent. It would be nice if this was property on the ActionBar.
        var bar = frame.topmost().ios.controller.navigationBar;
        bar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.UIBarMetricsDefault);
        bar.translucent = true;
        bar.shadowImage = UIImage.new();
        bar.tintColor = UIColor.whiteColor();
        // TODO: Is it possible to style the title color of the action bar?
        (<any>bar).titleTextAttributes = { [NSForegroundColorAttributeName]: UIColor.whiteColor() };
        
        var sideDrawerView = page.getViewById("side-drawer");
        sideDrawerView.ios.sideDrawer.style.shadowMode = TKSideDrawerShadowMode.TKSideDrawerShadowModeSideDrawer;
        sideDrawerView.ios.sideDrawer.style.dimOpacity = 0.5;
    }
}

// TODO: The tap="{{ toggleWrapLayout }}" in the XML doesn't seem to work.
export function toggleWrapLayout(e: any) {
    e.object.bindingContext.toggleWrapLayout();
}

export function navigateToExampleGroup(args: gestures.GestureEventData) {
    page.getViewById("side-drawer").closeDrawer();
    var exampleGroup = <examplesVM.ExampleGroup>args.view.bindingContext;
    var context = new groupPageVM.GroupPageViewModel(exampleGroup, false);
    navigator.navigateToExampleGroup(context);
}

export function navigateToExample(args: gestures.GestureEventData) {
    page.getViewById("side-drawer").closeDrawer();
    console.log("Navigate to example...");
    var example = <examplesVM.Example>args.view.bindingContext;
    var context = new examplePageVM.ExamplePageViewModel(example);
    navigator.navigateToExample(context);
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}

export function tapHome(args) {
    page.getViewById("side-drawer").closeDrawer();
}

export function tapAbout(args) {
    page.getViewById("side-drawer").closeDrawer();
    navigator.navigateToAbout();
}

export function tapGettingStarted(args) {
    page.getViewById("side-drawer").closeDrawer();
    navigator.openLink(args.object);
}

export function tapDocumentation(args) {
    page.getViewById("side-drawer").closeDrawer();
    navigator.openLink(args.object);
}

export function tapSDKExamples(args) {
    page.getViewById("side-drawer").closeDrawer();
    navigator.openLink(args.object);
}

export function tapProductPage(args) {
    page.getViewById("side-drawer").closeDrawer();
    navigator.openLink(args.object);
}
