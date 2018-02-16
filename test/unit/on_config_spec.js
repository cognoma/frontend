describe("UNIT: on_config", function() {
    var $_locationProvider, $_urlRouterProvider, $_stateProvider;

    let $_state,
        $_rootScope,
        $_templateCache,
        $_location,
        _state = "app"; // redirected root component state

    beforeEach(function() {
        angular
            .module("locationProviderConfig", ["ui.router"])
            .config(function(
                $locationProvider,
                $urlRouterProvider,
                $stateProvider
            ) {
                $_locationProvider = $locationProvider;
                $_urlRouterProvider = $urlRouterProvider;
                $_stateProvider = $stateProvider;
                spyOn($_locationProvider, "html5Mode").and.callThrough();
                spyOn($_urlRouterProvider, "when").and.callThrough();
                spyOn($_urlRouterProvider, "otherwise").and.callThrough();
            });

        angular.mock.module("locationProviderConfig");
        angular.mock.module("app");
        angular.mock.inject();
    });

    it("$locationProvider: should set html5 mode with no required <base>", function() {
        expect($_locationProvider.html5Mode).toHaveBeenCalledWith({
            enabled: true,
            requireBase: false
        });
    });

    it("$urlRouterProvider: should have registered a default route", function() {
        expect($_urlRouterProvider.otherwise).toHaveBeenCalled();
    });

    it("$urlRouterProvider: should have called registered 7 routes", function() {
        //Otherwise internally calls when. So, call count of when has to be 7
        expect($_urlRouterProvider.when.calls.count()).toBe(7);
    });

    describe("STATE::", () => {
        function goTo(state) {
            $_state.go(state);
            $_rootScope.$digest();
        }

        beforeEach(() => {
            inject(function($state, $rootScope, $templateCache, $location) {
                $_state = $state;
                $_rootScope = $rootScope;
            });
        });

        describe("app", () => {
            it('should respond to URL "/"', function() {
                expect($_state.href(_state)).toEqual("/");
            });

            it("should activate the state", function() {
                goTo(_state);
                expect($_state.current.name).toBe("app.home"); // app redirects to query-builder/mutations
            });

            // it('should have correct template defined', function() {
            //     goTo(_state);
            //     expect($_state.$current.template).toBeDefined();
            //     expect($_state.$current.template).toEqual('<app id="app" class="clearfix"></app>');
            // });
        });

        describe("app.queryBuilder", () => {
            beforeEach(() => {
                _state = "app.queryBuilder";
            });

            it('should respond to URL "/query-builder"', function() {
                goTo(_state);
                expect($_state.href(_state)).toEqual("/query-builder");
            });

            it("should have a parent state", function() {
                goTo(_state);
                let _parentState = "app";
                expect($_state.includes(_parentState)).toBeTruthy();
            });

            // it('should have correct component template defined', function() {
            //     goTo(_state);
            //     expect($_state.$current.component).toBeDefined();
            //     expect($_state.$current.component).toEqual('queryBuilder');
            // });

            // it('should have redirectTo defined', function() {
            //     goTo(_state);
            //     expect($_state.$current.redirectTo).toBeDefined();
            //     expect($_state.$current.redirectTo).toEqual('/query-builder/mutations');
            // });

            it("should activate redirectTo app.queryBuilder.mutations", function() {
                goTo(_state);
                expect($_state.current.name).toBe("app.queryBuilder.mutations");
            });
        });

        describe("app.queryBuilder.mutations", () => {
            beforeEach(() => {
                _state = "app.queryBuilder.mutations";
            });

            it('should respond to URL "/query-builder/mutations"', function() {
                goTo(_state);
                expect($_state.href(_state)).toEqual(
                    "/query-builder/mutations"
                );
            });

            it("should have a root state", function() {
                goTo(_state);
                let _parentState = "app";
                expect($_state.includes(_parentState)).toBeTruthy();
            });

            it("should have a parent state", function() {
                goTo(_state);
                let _parentState = "app.queryBuilder";
                expect($_state.includes(_parentState)).toBeTruthy();
            });

            it("should activate the state", function() {
                goTo(_state);
                expect($_state.current.name).toBe(_state);
            });

            it("should have 2 views defined", function() {
                goTo(_state);
                expect($_state.current.views).toBeDefined();
                expect(Object.keys($_state.current.views).length).toBe(2);
            });
        });

        describe("app.queryBuilder.disease", () => {
            beforeEach(() => {
                _state = "app.queryBuilder.disease";
            });

            it('should respond to URL "/query-builder/disease-type"', function() {
                goTo(_state);
                expect($_state.href(_state)).toEqual(
                    "/query-builder/disease-type"
                );
            });

            it("should have a root state", function() {
                goTo(_state);
                let _parentState = "app";
                expect($_state.includes(_parentState)).toBeTruthy();
            });

            it("should have a parent state", function() {
                goTo(_state);
                let _parentState = "app.queryBuilder";
                expect($_state.includes(_parentState)).toBeTruthy();
            });

            it("should activate the state", function() {
                goTo(_state);
                expect($_state.current.name).toBe(_state);
            });

            it("should have 2 views defined", function() {
                goTo(_state);
                expect($_state.current.views).toBeDefined();
                expect(Object.keys($_state.current.views).length).toBe(2);
            });
        });
    }); ///STATES
});
