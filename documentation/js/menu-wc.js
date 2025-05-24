'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">camshield-rest-api-with-mysql documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-26051677d11571b48ebbc1f433579eec3fd823ebffd13f180a10f8b8b82b9c62362ba4870e6684d730ea37daff4eea3899f38781f33a0f92be7b55e6f8a72f3d"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-26051677d11571b48ebbc1f433579eec3fd823ebffd13f180a10f8b8b82b9c62362ba4870e6684d730ea37daff4eea3899f38781f33a0f92be7b55e6f8a72f3d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-26051677d11571b48ebbc1f433579eec3fd823ebffd13f180a10f8b8b82b9c62362ba4870e6684d730ea37daff4eea3899f38781f33a0f92be7b55e6f8a72f3d"' :
                                            'id="xs-controllers-links-module-AuthModule-26051677d11571b48ebbc1f433579eec3fd823ebffd13f180a10f8b8b82b9c62362ba4870e6684d730ea37daff4eea3899f38781f33a0f92be7b55e6f8a72f3d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-26051677d11571b48ebbc1f433579eec3fd823ebffd13f180a10f8b8b82b9c62362ba4870e6684d730ea37daff4eea3899f38781f33a0f92be7b55e6f8a72f3d"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-26051677d11571b48ebbc1f433579eec3fd823ebffd13f180a10f8b8b82b9c62362ba4870e6684d730ea37daff4eea3899f38781f33a0f92be7b55e6f8a72f3d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-26051677d11571b48ebbc1f433579eec3fd823ebffd13f180a10f8b8b82b9c62362ba4870e6684d730ea37daff4eea3899f38781f33a0f92be7b55e6f8a72f3d"' :
                                        'id="xs-injectables-links-module-AuthModule-26051677d11571b48ebbc1f433579eec3fd823ebffd13f180a10f8b8b82b9c62362ba4870e6684d730ea37daff4eea3899f38781f33a0f92be7b55e6f8a72f3d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' :
                                        'id="xs-injectables-links-module-PrismaModule-36c53f74bb6d8f0a451f53d23ed4388d54fba43d7d39e25a326d1e2aa0000dc19ecfddd62a9f6446b540ba92e86e1d48c0cd4c3e436b6f77146a89d6df37ec3a"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-dbe0170d8d8bde84177baf690586347df6227423ca2f401c66a40eb166b35ffff3561294a92e90f5a44f9a3ee4a6ba90195158b876c9645aa9da31614fa601e5"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-dbe0170d8d8bde84177baf690586347df6227423ca2f401c66a40eb166b35ffff3561294a92e90f5a44f9a3ee4a6ba90195158b876c9645aa9da31614fa601e5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-dbe0170d8d8bde84177baf690586347df6227423ca2f401c66a40eb166b35ffff3561294a92e90f5a44f9a3ee4a6ba90195158b876c9645aa9da31614fa601e5"' :
                                            'id="xs-controllers-links-module-UsersModule-dbe0170d8d8bde84177baf690586347df6227423ca2f401c66a40eb166b35ffff3561294a92e90f5a44f9a3ee4a6ba90195158b876c9645aa9da31614fa601e5"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-dbe0170d8d8bde84177baf690586347df6227423ca2f401c66a40eb166b35ffff3561294a92e90f5a44f9a3ee4a6ba90195158b876c9645aa9da31614fa601e5"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-dbe0170d8d8bde84177baf690586347df6227423ca2f401c66a40eb166b35ffff3561294a92e90f5a44f9a3ee4a6ba90195158b876c9645aa9da31614fa601e5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-dbe0170d8d8bde84177baf690586347df6227423ca2f401c66a40eb166b35ffff3561294a92e90f5a44f9a3ee4a6ba90195158b876c9645aa9da31614fa601e5"' :
                                        'id="xs-injectables-links-module-UsersModule-dbe0170d8d8bde84177baf690586347df6227423ca2f401c66a40eb166b35ffff3561294a92e90f5a44f9a3ee4a6ba90195158b876c9645aa9da31614fa601e5"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthPayloadDto.html" data-type="entity-link" >AuthPayloadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsPasswordPolicy.html" data-type="entity-link" >IsPasswordPolicy</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPayloadDto.html" data-type="entity-link" >UserPayloadDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtGuard.html" data-type="entity-link" >JwtGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/OnlyAuthorizedRoleGuard.html" data-type="entity-link" >OnlyAuthorizedRoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/UserPayload.html" data-type="entity-link" >UserPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});