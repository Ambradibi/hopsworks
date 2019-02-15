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

package io.hops.hopsworks.admin.project;

import io.hops.hopsworks.admin.maintenance.ClientSessionState;
import io.hops.hopsworks.common.dao.project.team.ProjectRoleTypes;
import io.hops.hopsworks.common.dao.project.team.ProjectTeamFacade;
import java.io.Serializable;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import javax.faces.event.AbortProcessingException;
import javax.faces.event.ValueChangeEvent;
import javax.faces.event.ValueChangeListener;
import io.hops.hopsworks.common.dao.user.activity.ActivityFacade;

@ManagedBean(name = "valueChangeMB",
        eager = true)
@RequestScoped
public class ValueChangeMB implements Serializable, ValueChangeListener {

  @EJB
  private ProjectTeamFacade projectTeamController;

  @EJB
  private ActivityFacade activityFacade;

  private ProjectRoleTypes newTeamRole;

  @ManagedProperty(value = "#{clientSessionState}")
  private ClientSessionState sessionState;

  public void setSessionState(ClientSessionState sessionState) {
    this.sessionState = sessionState;
  }

  public ProjectRoleTypes getNewTeamRole() {
    return newTeamRole;
  }

  public void setNewTeamRole(ProjectRoleTypes newTeamRole) {
    this.newTeamRole = newTeamRole;
  }

  public synchronized String updateProjectTeamRole(String email,
          ProjectRoleTypes role) {
    try {
      projectTeamController.updateTeamRole(sessionState.getActiveProject(),
              email, role.getRole());
      activityFacade.persistActivity(ActivityFacade.CHANGE_ROLE + email + " to " + role, sessionState.getActiveProject()
          , sessionState.getLoggedInUsername(), ActivityFacade.ActivityFlag.MEMBER);
    } catch (Exception ejb) {
      //addErrorMessageToUserAction("Error: Update failed.");
      return "Failed";
    }
    //addMessage("Team role updated successful "+ email + " at "+ projectMB.getProjectName());
    //return "projectPage?faces-redirect=true";
    newTeamRole = null;
    return "OK";
  }

  @Override
  public void processValueChange(ValueChangeEvent event) throws
          AbortProcessingException {
    setNewTeamRole((ProjectRoleTypes) event.getNewValue());
  }

}
