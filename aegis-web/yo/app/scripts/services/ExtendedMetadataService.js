/*
 * Changes to this file committed after and not including commit-id: ccc0d2c5f9a5ac661e60e6eaf138de7889928b8b
 * are released under the following license:
 *
 * This file is part of Hopsworks
 * Copyright (C) 2018, Logical Clocks AB. All rights reserved
 *
 * Hopsworks is free software: you can redistribute it and/or modify it under the terms of
 * the GNU Affero General Public License as published by the Free Software Foundation,
 * either version 3 of the License, or (at your option) any later version.
 *
 * Hopsworks is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE.  See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 *
 * Changes to this file committed before and including commit-id: ccc0d2c5f9a5ac661e60e6eaf138de7889928b8b
 * are released under the following license:
 *
 * Copyright (C) 2013 - 2018, Logical Clocks AB and RISE SICS AB. All rights reserved
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS  OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR  OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

angular.module('hopsWorksApp')

        .factory('ExtendedMetadataService', ['$http', function ($http) {

            var service = {

              LANGUAGES: [
                {id: 'BUL', name: 'Bulgarian'},
                {id: 'HRV', name: 'Croatian'},
                {id: 'CES', name: 'Czech'},
                {id: 'DAN', name: 'Danish'},
                {id: 'NLD', name: 'Dutch'},
                {id: 'ENG', name: 'English'},
                {id: 'EST', name: 'Estonian'},
                {id: 'FIN', name: 'Finnish'},
                {id: 'FRA', name: 'French'},
                {id: 'DEU', name: 'German'},
                {id: 'ELL', name: 'Greek'},
                {id: 'HUN', name: 'Hungarian'},
                {id: 'GLE', name: 'Irish'},
                {id: 'ITA', name: 'Italian'},
                {id: 'LAV', name: 'Latvian'},
                {id: 'LIT', name: 'Lithuanian'},
                {id: 'MLT', name: 'Maltese'},
                {id: 'POL', name: 'Polish'},
                {id: 'POR', name: 'Portuguese'},
                {id: 'RON', name: 'Romanian'},
                {id: 'SLK', name: 'Slovak'},
                {id: 'SLV', name: 'Slovenian'},
                {id: 'SPA', name: 'Spanish'},
                {id: 'SWE', name: 'Swedish'},
              ],

              LICENCES: [
                { id: 'CC0', name: 'CC0 - Creative Commons CC0 1.0 Universal', default: true},
                { id: 'CC_BY', name: 'CC_BY - Creative Commons Attribution 4.0 International'},
                { id: 'CC_BYNC', name: 'CC_BYNC - Creative Commons Attribution–NonCommercial 4.0 International'},
                { id: 'CC_BYNCND', name: 'CC_BYNCND - Creative Commons Attribution–NonCommercial–NoDerivatives 4.0 International'},
                { id: 'CC_BYNCND_1_0', name: 'CC_BYNCND_1_0 - Creative Commons Attribution–NoDerivs–NonCommercial 1.0 Generic'},
                { id: 'CC_BYNCND_2_0', name: 'CC_BYNCND_2_0 - Creative Commons Attribution–NonCommercial–NoDerivs 2.0 Generic'},
                { id: 'CC_BYNCND_2_5', name: 'CC_BYNCND_2_5 - Creative Commons Attribution–NonCommercial–NoDerivs 2.5 Generic'},
                { id: 'CC_BYNCND_3_0', name: 'CC_BYNCND_3_0 - Creative Commons Attribution–NonCommercial–NoDerivs 3.0 Unported'},
                { id: 'CC_BYNCND_4_0', name: 'CC_BYNCND_4_0 - Creative Commons Attribution–NonCommercial–NoDerivatives 4.0 International'},
                { id: 'CC_BYNCSA', name: 'CC_BYNCSA - Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International'},
                { id: 'CC_BYNCSA_1_0', name: 'CC_BYNCSA_1_0 - Creative Commons Attribution–NonCommercial–ShareAlike 1.0 Generic'},
                { id: 'CC_BYNCSA_2_0', name: 'CC_BYNCSA_2_0 - Creative Commons Attribution–NonCommercial–ShareAlike 2.0 Generic'},
                { id: 'CC_BYNCSA_2_5', name: 'CC_BYNCSA_2_5 - Creative Commons Attribution–NonCommercial–ShareAlike 2.5 Generic'},
                { id: 'CC_BYNCSA_3_0', name: 'CC_BYNCSA_3_0 - Creative Commons Attribution–NonCommercial–ShareAlike 3.0 Unported'},
                { id: 'CC_BYNCSA_4_0', name: 'CC_BYNCSA_4_0 - Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International'},
                { id: 'CC_BYNC_1_0', name: 'CC_BYNC_1_0 - Creative Commons Attribution–NonCommercial 1.0 Generic'},
                { id: 'CC_BYNC_2_0', name: 'CC_BYNC_2_0 - Creative Commons Attribution–NonCommercial 2.0 Generic'},
                { id: 'CC_BYNC_2_5', name: 'CC_BYNC_2_5 - Creative Commons Attribution–NonCommercial 2.5 Generic'},
                { id: 'CC_BYNC_3_0', name: 'CC_BYNC_3_0 - Creative Commons Attribution–NonCommercial 3.0 Unported'},
                { id: 'CC_BYNC_4_0', name: 'CC_BYNC_4_0 - Creative Commons Attribution–NonCommercial 4.0 International'},
                { id: 'CC_BYND', name: 'CC_BYND - Creative Commons Attribution–NoDerivatives 4.0 International'},
                { id: 'CC_BYND_1_0', name: 'CC_BYND_1_0 - Creative Commons Attribution–NoDerivs 1.0 Generic'},
                { id: 'CC_BYND_2_0', name: 'CC_BYND_2_0 - Creative Commons Attribution–NoDerivs 2.0 Generic'},
                { id: 'CC_BYND_2_5', name: 'CC_BYND_2_5 - Creative Commons Attribution–NoDerivs 2.5 Generic'},
                { id: 'CC_BYND_3_0', name: 'CC_BYND_3_0 - Creative Commons Attribution–NoDerivs 3.0 Unported'},
                { id: 'CC_BYND_4_0', name: 'CC_BYND_4_0 - Creative Commons Attribution–NoDerivatives 4.0 International'},
                { id: 'CC_BYSA', name: 'CC_BYSA - Creative Commons Attribution–ShareAlike 4.0 International'},
                { id: 'CC_BYSA_1_0', name: 'CC_BYSA_1_0 - Creative Commons Attribution–ShareAlike 1.0 Generic'},
                { id: 'CC_BYSA_2_0', name: 'CC_BYSA_2_0 - Creative Commons Attribution–ShareAlike 2.0 Generic'},
                { id: 'CC_BYSA_2_5', name: 'CC_BYSA_2_5 - Creative Commons Attribution–ShareAlike 2.5 Generic'},
                { id: 'CC_BYSA_3_0', name: 'CC_BYSA_3_0 - Creative Commons Attribution–ShareAlike 3.0 Unported'},
                { id: 'CC_BYSA_4_0', name: 'CC_BYSA_4_0 - Creative Commons Attribution–ShareAlike 4.0 International'},
                { id: 'CC_BY_1_0', name: 'CC_BY_1_0 - Creative Commons Attribution 1.0 Generic'},
                { id: 'CC_BY_2_0', name: 'CC_BY_2_0 - Creative Commons Attribution 2.0 Generic'},
                { id: 'CC_BY_2_5', name: 'CC_BY_2_5 - Creative Commons Attribution 2.5 Generic'},
                { id: 'CC_BY_3_0', name: 'CC_BY_3_0 - Creative Commons Attribution 3.0 Unported'},
                { id: 'CC_BY_4_0', name: 'CC_BY_4_0 - Creative Commons Attribution 4.0 International'},
                { id: 'COM_REUSE', name: 'COM_REUSE - European Commission reuse notice'},
                { id: 'EUPL_1_0', name: 'EUPL_1_0 - European Union Public Licence v.1.0'},
                { id: 'EUPL_1_1', name: 'EUPL_1_1 - European Union Public Licence v. 1.1'},
                { id: 'EUPL_1_2', name: 'EUPL_1_2 - European Union Public Licence v. 1.2'},
                { id: 'GNU_FDL', name: 'GNU_FDL - GNU Free Documentation License'},
                { id: 'ISA_OML', name: 'ISA_OML - ISA Open Metadata Licence 1.1'},
                { id: 'ODC_BL', name: 'ODC_BL - Open Data Commons Open Database License v1.0'},
                { id: 'ODC_BY', name: 'ODC_BY - Open Data Commons Attribution License v1.0'},
                { id: 'ODC_PDDL', name: 'ODC_PDDL - Open Data Commons Public Domain Dedication and License 1.0'},
                { id: 'OP_DATPRO', name: 'OP_DATPRO - Provisional data'}
              ],

              
            };
            
            return service;
          }]);